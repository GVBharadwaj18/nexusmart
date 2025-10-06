import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";

//toggle stock status of a product
export async function POST(request) {
    try{
        const {userId}=getAuth(request);
        const {productId}=await request.json()
        if(!productId){
            return NextResponse.json({error:'Product ID is required'},{status:400});
        }
        const storeId=await authSeller(userId);
        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        
        //check if the product exists
        const product=await prisma.product.findFirst({
            where:{id:productId,storeId}
        });
        if(!product){
            return NextResponse.json({error:'Product not found'},{status:404});
        }

        await prisma.product.update({
            where:{id:productId},
            data:{inStock:!product.inStock}
        });
        return NextResponse.json({message:'Product stock status updated successfully'});
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}
