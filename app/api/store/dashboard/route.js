import {getAuth} from "@clerk/nextjs/server ";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";


//get dashboard data for a seller (total orders,total earnings,total products)
export async function GET(request) {
    try{
        const {userId}=getAuth(request);
        const storeId=await authSeller(userId);
        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        //get all orders for seller
        const orders=await prisma.order.findMany({
            where:{storeId}
        });

        //get all products with ratings for seller
        const products=await prisma.product.findMany({
            where:{storeId}
        });
        const ratings=await prisma.rating.findMany({
            where:{productId:{in:products.map(p=>p.id)} },
            include:{user:true,product:true}
        });

        const dashboardData={
            ratings,
            totalOrders:orders.length,
            totalEarnings:Math.round(orders.reduce((acc,order)=>acc+order.total,0)),
            totalProducts:products.length
        }
        return NextResponse.json({dashboardData});


    }
    catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    } 
}
  
