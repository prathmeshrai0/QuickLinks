import prisma from "@/prisma/connectDb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


// get latest 7 users 
export async function GET() {
    const users = await prisma.userInfo.findMany({
        orderBy:{
            createdAt:"desc"
        },
        take : 7,
    }); 

    return new Response(JSON.stringify({ isAvailable: true, status: 200 , message:"fetched latest customere" , users: users}));
    
}