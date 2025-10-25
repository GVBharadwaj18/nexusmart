import {getAuth} from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
import prisma from "@/lib/prisma";

//Update Order Status

export async function POST(request) {
    try{
        const {userId}=getAuth(request);
        const storeId=await authSeller(userId); 
        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }

        const {orderId,status}=await request.json();

        await prisma.order.update({
            where:{id:orderId,storeId},
            data:{status}
        })
        return NextResponse.json({message:'Order status updated successfully'});    

    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message },{status:400});
    }
}

//get all orders for a seller
export async function GET(request) {
    try{
        const {userId}=getAuth(request);
        const storeId=await authSeller(userId); 
        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        const orders=await prisma.order.findMany({
            where:{storeId},
            include:{user:true,address:true,orderItems:{include:{product:true}}},
            orderBy:{createdAt:'desc'}
        });
        return NextResponse.json({orders});
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}