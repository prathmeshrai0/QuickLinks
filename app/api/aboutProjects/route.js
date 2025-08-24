import prisma from "@/prisma/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// to save projects 
export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  let response; 

  if (session?.user) {
    body.forEach(obj => {
      delete obj.tag;
      obj.UserInfoId = session.user.id;   
    }); 

    const user = await prisma.allProjects.createMany({
      data: body,
    });
    response = {
      success: true,
      status: 201,
      dataSaved: user,
      message: "Projects data saved",
      user: session?.user
    };
  } else { 
    response = {
      success: false,
      status: 401,
      message: "data not saved session data not available",
    };
  }

  return new Response(JSON.stringify(response));
}


// used to get project according to session data 
export async function GET(req) {

  const session = await getServerSession(authOptions);
  let response;
  
  const Projects = await prisma.allProjects.findFirst({
    where: {
      UserInfoId: session.user.id,
    }
  });
  if (Projects) {
    response = {
      success: true,
      status: 200,
      message: "Projects fetched",
      projects: Projects
    };
  } else {
    response = {
      success: false,
      status: 404,
      message: "Projects not Present  ",
    };
  }

  return new Response(JSON.stringify(response));
}