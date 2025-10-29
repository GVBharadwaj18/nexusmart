import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
    try{
        const body=await request.text()
        const sig=request.get('stripe-signature')

        const event=stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

        const handlePaymentIntent=async(paymentIntentId,isPaid)=>{
            const session=await stripe.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })
            const {orderIds,userId, appId}=session.data[0].metadata;

            if(appId!=='nexusmart'){
            return NextResponse.json({received:true},{message:'Invalid appId'})
        }
        const orderIdsArray=orderIds.split(',')
        if(isPaid){
            //update orders as paid
            await Promise.all(orderIdsArray.map(async(orderId)=>{
                await prisma.order.update({
                    where:{id:orderId},
                    data:{isPaid:true}
                })
            }))

            //delete cart from user
            await prisma.user.update({
                where:{id:userId},
                data:{cart:{}}
            })

        }else{
            //delete orders
            await Promise.all(orderIdsArray.map(async(orderId)=>{
                await prisma.order.delete({
                    where:{id:orderId}
                })
            }))
        }
        }


        
        switch(event.type){
            case 'payment_intent.succeeded':{
                await handlePaymentIntent(event.data.object,true)
                break;
            }
            case 'payment_intent.canceled':{
                await handlePaymentIntent(event.data.object,false)
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`)
                break;
        }
        return NextResponse.json({received:true})
    }catch(error){
        console.error(error)
        return NextResponse.json({error:error.code || error.message}, {status:400})
    }
}

export const config={
    api:{
        bodyParser:false,
    }
}