import prisma from "@/prisma/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// creating user info
export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  let response;
  if (session?.user) {
    // check if the userInfo already exists
    const user = await prisma.userInfo.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (user) {
      response = {
        success: false,
        status: 409,
        message: "User has already submitted User Info !",
      };
    } else {
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
        status: 200,
        dataSaved: user,
        message: "data saved",
      };
    }
  } else {
    response = {
      success: false,
      status: 401,
      message: "Kindly SignIn / LogIn First",
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
  let response;
  if (user) {
    response = {
      isAvailable: true,
      status: 200,
      message: "Welcome",
      user: user,
    };
  } else {
    response = {
      isAvailable: false,
      status: 404,
      message: "User Data is not Available Kindly fill the Form",
    };
  }

  return new Response(JSON.stringify(response));
}
