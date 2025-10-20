 import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin"
import { getAuth } from "@clerk/nextjs/server";
import { all } from "axios";
import { NextResponse } from "next/server";

//get dashboard data fro  admin (total users ,total stores, total products, total revenue)
export async function GET(request){
    try{
        const {userId}=getAuth(request)
        const isAdmin=await authAdmin(userId)
        if(!isAdmin){
            return NextResponse.json({error:"Unauthorized"},{status:401 })
        }
        //get total orders
        const orders=await prisma.order.count()
        //get total stores on the platform
        const stores=await prisma.store.count()
        //get all orders include only createdat and totalPrice
        const allOrders=await prisma.order.findMany({
            select:{
                createdAt:true,
                total:true,
            }
        })
        let totalRevenue=0
        allOrders.forEach(order=>{
            totalRevenue+=order.total
        })

        const revenue=totalRevenue.toFixed(2)
        //total products on the platform
        const products=await prisma.product.count()
        const dashboardData={
            orders,
            stores,
            products,
            revenue,
            allOrders,
        }
        return NextResponse.json({dashboardData})
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message },{status:400})
    }
}

