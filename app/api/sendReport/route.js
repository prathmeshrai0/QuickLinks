import prisma from "@/prisma/connectDb";
import { isSessionAvailable } from "@/utlis";

// to save projects
export async function POST(req) {
  let response;
  const session = await isSessionAvailable();
  // if (session?.success === false) {
  //     return new Response(JSON.stringify(session));
  // }

  const body = await req.json();
  console.log(session.user.email);
  console.log(session.user.username);

  const ReportData = {
    message: body.message,
    email: session.user.email,
    username: session.user.username,
    userId: session.user.id,
  };

  try {
    const createReport = await prisma.report.create({
      data: { ...ReportData },
    });
    response = {
      success: true,
      status: 200,
      dataSaved: createReport,
      message: "Report data submitted",
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
