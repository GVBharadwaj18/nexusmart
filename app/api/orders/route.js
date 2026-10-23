import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PaymentMethod } from "@prisma/client";
import Stripe from "stripe";
import { inngest } from "@/inngest/client";


export async function POST(request) {
    try{
        const {userId,has}=getAuth(request);
        if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        const {addressId,items,couponCode,paymentMethod}=await request.json();


        //check if all required fields are present
        if(!addressId || !items || items.length===0 || !paymentMethod || !Array.isArray(items)){
            return NextResponse.json({error:'All fields are required'},{status:401});
        }

        let coupon=null;
        if(couponCode){
            coupon=await prisma.coupon.findUnique({
            where:{code:couponCode }
        })
        if(!coupon){
            return NextResponse.json({error:"Coupon not found"},{status:400    })
        }
        }
        
        //Check if coupon code is valid for new users
        if(couponCode && coupon.forNewUser){
            const userorders=await prisma.order.findMany({where:{userId}})
            if(userorders.length>0){
                return NextResponse.json({error:"Coupon valid for new users only"},{status:400})
            }
        }
        //check if coupon code is valid for members
         const isPlusMember=has({plan:'plus'})
        if(couponCode && coupon.forMember){
           
            if(!isPlusMember){
                return NextResponse.json({error:"Coupon valid for Plus members only"},{status:400})
            }
        }

        // Concurrency Control: Atomic stock check, decrement, and multi-vendor order generation inside Prisma transaction
        const { orderids, fullAmount } = await prisma.$transaction(async (tx) => {
            const ordersByStore = new Map();

            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.id } });
                if (!product) {
                    throw new Error(`Product not found with id: ${item.id}`);
                }
                if (!product.inStock || product.stock < item.quantity) {
                    throw new Error(
                        `Insufficient stock for "${product.name}". Only ${product.stock} left in stock.`
                    );
                }

                // Concurrency control: Atomic decrement
                const updatedProduct = await tx.product.update({
                    where: { id: item.id },
                    data: {
                        stock: { decrement: item.quantity },
                    }
                });

                // Auto-toggle inStock to false if remaining stock is 0
                if (updatedProduct.stock <= 0) {
                    await tx.product.update({
                        where: { id: item.id },
                        data: { inStock: false }
                    });
                }

                const storeId = product.storeId;
                if (!ordersByStore.has(storeId)) {
                    ordersByStore.set(storeId, []);
                }
                ordersByStore.get(storeId).push({ ...item, price: product.price });
            }

            let createdOrderIds = [];
            let totalAmount = 0;
            let isShippingFeeAdded = false;

            // Create orders for each seller
            for (const [storeId, sellerItems] of ordersByStore.entries()) {
                let total = sellerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

                if (couponCode && coupon) {
                    total -= (total * coupon.discount) / 100;
                }
                if (!isPlusMember && !isShippingFeeAdded) {
                    total += 1;
                    isShippingFeeAdded = true;
                }
                totalAmount += parseFloat(total.toFixed(2));
                const order = await tx.order.create({
                    data: {
                        userId,
                        storeId,
                        addressId,
                        total: parseFloat(total.toFixed(2)),
                        paymentMethod,
                        isCouponUsed: !!coupon,
                        coupon: coupon ? coupon : {},
                        orderItems: {
                            create: sellerItems.map((item) => ({
                                productId: item.id,
                                quantity: item.quantity,
                                price: item.price,
                            }))
                        }
                    }
                });
                createdOrderIds.push(order.id);
            }

            return { orderids: createdOrderIds, fullAmount: totalAmount };
        });

        if(paymentMethod==='STRIPE'){
            // Schedule Inngest durable reservation release timer (31 min, aligned with Stripe's 30-min checkout expiry)
            try {
                const reservationExpiresAt = new Date(Date.now() + 31 * 60 * 1000).toISOString();
                await inngest.send({
                    name: "app/order.reservation.created",
                    data: {
                        orderIds: orderids,
                        expiresAt: reservationExpiresAt,
                    }
                });
            } catch (inngestError) {
                console.error("Inngest reservation event error:", inngestError);
            }

            const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
            const origin=await request.headers.get('origin')

            const session=await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items:[{
                    price_data:{
                        currency:'aud',
                        product_data:{
                            name:'Order'
                        },
                        unit_amount:Math.round(fullAmount*100),
                    },
                    quantity:1,
                }],
                expires_at:Math.floor(Date.now()/1000)+30*60, //current plus 30 min
                mode:'payment',
                success_url:`${origin}/loading?nextUrl=orders`,
                cancel_url:`${origin}/cart`,
                metadata:{
                    orderIds:orderids.join(','),
                    userId,
                    appId:'nexusmart',
                }
            })
            return NextResponse.json({session});
        }
        //clear cart
        await prisma.user.update({
            where:{id:userId},
            data:{cart:{}}
        });
        return NextResponse.json({message:'Order placed successfully'});

    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}


//get all orders for a user
export async function GET(request){
    try{

        const {userId}=getAuth(request);
        const orders=await prisma.order.findMany({
            where:{userId, OR:[
                {paymentMethod: PaymentMethod.COD},
                {AND:[
                    {paymentMethod:PaymentMethod.STRIPE},
                    {isPaid:true}
                ]}

            ]},
            include:{
                orderItems:{
                    include:{product:true}},
                    address:true,
                },
            orderBy:{createdAt:'desc'}
        })
        
        return NextResponse.json({orders});

    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}