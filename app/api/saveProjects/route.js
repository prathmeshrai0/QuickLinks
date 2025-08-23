import prisma from "@/prisma/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  let response;

  // console.log(body);

  if (session?.user) {
    body.forEach(obj => {
      delete obj.tag;
      obj.UserInfoId = session.user.id;
    });
    // console.log(body);

    const user = await prisma.allProjects.createMany({
      data: body,
    });
    response = {
      success: true,
      dataSaved: user,
      message: "data saved",
      user:session?.user
    };
  } else {
    // console.log(" else case is executed");
    response = {
      success: false,
      message: "data not saved session data not available",
    };
  }

  return new Response(JSON.stringify(response));
  return new Response();
  // JSON.stringify({ success: true, message: "data  all projects saved" })
}
