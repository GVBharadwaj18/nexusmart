import imagekit from "@/configs/imagekit";
import {getAuth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//create store
export async function POST(request) {
    try{
        const {userId}=getAuth(request);

        //getting form data from the req
        const formData=await request.formData();
        const name=formData.get('name');
        const username=formData.get('username');
        const description=formData.get('description');
        const address=formData.get('address');
        const contact=formData.get('contact');
        const email=formData.get('email');
        const image=formData.get('image');
        if(!name || !username || !description || !address || !contact || !email || !image){
            return NextResponse.json({error:'All fields are required'},{status:400});
        }


        //check if user already has a store
        const store=await prisma.store.findFirst({
            where:{userId:userId}
        });

        //if store already exists then send status of the store
        if(store){
            return NextResponse.json({status:store.status})
        }
        //check if username is already taken
        const isUsernameTaken=await prisma.store.findFirst({
            where:{username:username.toLowerCase()}
        });
        if(isUsernameTaken){
            return NextResponse.json({error:'Username is already taken'},{status:400});
        }

        //uploading image to imagekit   
        const buffer=Buffer.from(await image.arrayBuffer());
        const response=await imagekit.upload({
            file:buffer,
            fileName:image.name,
            folder:"logos"
        });

        const optimizedImage=imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},
                {format:'webp'},
                {width:512}
            ]
        })

        const newStore=await prisma.store.create({
            data:{
                userId,
                name,
                description,
                username:username.toLowerCase(),
                address,
                contact,
                email,
                logo:optimizedImage,
        
            }
        })

        //link store to user
        await prisma.user.update({
            where:{id:userId},
            data:{store:{connect:{id:newStore.id}}}
        })
        
        return NextResponse.json({message:"applied,wait for approval"})

    }
    catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}

export async function GET(request) {
    try{
        const {userId}=getAuth(request);

        //check if user already has a store
        const store=await prisma.store.findFirst({
            where:{userId:userId}
        });
        //if store already exists then send status of the store
        if(store){
            return NextResponse.json({status:store.status})
        }
        return NextResponse.json({status:'not registered'})
        
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400});
    }
}