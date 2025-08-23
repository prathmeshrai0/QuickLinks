import prisma from "@/prisma/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// creating user info 
export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  let response;
  if (session?.user) {
    const user = await prisma.userInfo.create({
      data: {
        ...body,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    response = {
      success: true,
      dataSaved: user,
      message: "data saved",
    };
  } else {
    console.log(" else case is executed");
    response = {
      success: false,
      message: "data not saved session data not available",
    };
  }

  return new Response(JSON.stringify(response));
}

// getting particular userInfo data according to session data 
export async function GET(req) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session.user.id) {
    user = await prisma.userInfo.findFirst({
      where: {
        userId: session.user.id,
      },
    });
  }
  

  if (user) {
    return new Response(JSON.stringify({ isAvailable: true, status: 200 , message:"Welcome" , user: user}));
  } else {
    return new Response(JSON.stringify({ isAvailable: false, status: 404 , message:"User Data is not Available Kindly fill the Form" }));
  }
}
