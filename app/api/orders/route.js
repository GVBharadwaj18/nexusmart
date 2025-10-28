import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



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

        // group orders by storeid using map
        const ordersByStore=new Map()
        for(const item of items){
            const product=await prisma.product.findUnique({where:{id:item.id}})
            const storeId=product.storeId
            if(!ordersByStore.has(storeId)){
                ordersByStore.set(storeId,[])
            }
            ordersByStore.get(storeId).push({...item,price:product.price})
        }

        let orderids=[];
        let fullAmount=0;
        let isShippingFeeAdded=false;

        //create orders for each seller
        for(const [storeId,sellerItems] of ordersByStore.entries()){
            let total=sellerItems.reduce((acc,item)=>acc+item.price*item.quantity,0)

            if(couponCode){
                total-=(total*coupon.discount)/100;
            }
            if(!isPlusMember && !isShippingFeeAdded){
                total+=1;
                isShippingFeeAdded=true;
            }
            fullAmount+=parseFloat(total.toFixed(2));
            const order=await prisma.order.create({
                data:{
                    userId,
                    storeId,
                    addressId,
                    total:parseFloat(total.toFixed(2)),
                    paymentMethod,
                    isCouponUsed:coupon?true:false,
                    coupon:coupon?coupon:{},
                    orderItems:{
                        create:sellerItems.map(item=>({
                            productId:item.id,
                            quantity:item.quantity,
                            price:item.price,
                        }))
                    }
                }
            });
            orderids.push(order.id);
                    
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
                {paymentMethod:paymentMethod.COD},
                {AND:[
                    {paymentMethod:paymentMethod.STRIPE},
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