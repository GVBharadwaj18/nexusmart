import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
import imagekit from "@/configs/imagekit";
//Add new Product
export async function POST(request) {
    try{
        const {userId}=getAuth(request);
        const storeId=await authSeller(userId); 

        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        //get the data from the form
        const formData=await request.formData();
        const name=formData.get('name');
        const description=formData.get('description');
        const mrp=Number(formData.get('mrp'));
        const price=Number(formData.get('price'));
        const category=formData.get('category');
        const images=formData.getAll('images');

        if(!name || !description || !mrp || !price || !category || images.length<1){
            return NextResponse.json({error:'All fields are required'},{status:400});
        }

        //uploading images to imagekit
        const imagesUrl=await Promise.all(images.map(async(image)=>{
            const buffer=Buffer.from(await image.arrayBuffer());
            const response=await imagekit.upload({
                file:buffer,
                fileName:image.name,
                folder:"products"
            });
            const url=imagekit.url({
                path:response.filePath,
                transformation:[
                    {quality:'auto'},
                    {format:'webp'},
                    {width:1024}
                ]
            })
            return url;
        }));
        //create new product
        await prisma.product.create({
            data:{
                name,
                description,
                mrp,
                price,
                category,
                images:imagesUrl,
                storeId
            }
        })
        return NextResponse.json({message:'Product added successfully'});

    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message },{status:400});
    }
}

//get all products for a seller
export async function GET(request) {
    try{
        const {userId}=getAuth(request);
        const storeId=await authSeller(userId)
        if(!storeId){
            return NextResponse.json({error:'Unauthorized'},{status:401});
        }
        const products=await prisma.product.findMany({
            where:{storeId:storeId}
        });
        return NextResponse.json({products});
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}