import prisma from "@/prisma/connectDb"; 

// get latest 7 users
export async function GET(req) {
  let response;
  try {
    const users = await prisma.userInfo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }); 
    response = {
      isAvailable: true,
      status: 200,
      message: "fetched latest customers",
      users: users,
    };
  } catch (err) {
    console.error(err);
    response = {
      success: false,
      status: 500,
      message: "Error fetching users",
      error: err.message,
    };
  }
  return new Response(JSON.stringify(response));
}
