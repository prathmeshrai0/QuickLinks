import prisma from "@/prisma/connectDb";
import { isSessionAvailable } from "@/utlis";

// creating /  updating user info
export async function PUT(req) {
  let response;
  const body = await req.json();
  const { id, createdAt, updatedAt, userId, ...safeBody } = body;

  // return message if session not available
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  // console.log(safeBody, session.user.id , body);


  try {
    const result = await prisma.userInfo.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        ...safeBody,
      },
      create: {
        ...body,

        userId: session.user.id,
      },
    });


    response = {
      success: true,
      status: 200,
      message: "Operation successful",
    };
  } catch (error) {
    response = {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error,
    };
  }

  return new Response(JSON.stringify(response));
}

// getting particular userInfo data according to session data
export async function GET(req) {
  // return message if session not available
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }

  let user = null;
  user = await prisma.userInfo.findFirst({
    where: {
      userId: session.user.id,
    },
  }); 

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
      message: "Data not available kindly fill user info data",
    };
  }

  return new Response(JSON.stringify(response));
}
