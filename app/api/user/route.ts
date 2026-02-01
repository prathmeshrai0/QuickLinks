import prisma from "@/prisma/connectDb";
import { isSessionAvailable } from "@/utlis";
import { schema } from "@/components/Pages/UserInfo/schema/schema"
import { safeParse, ZodError } from "zod";
import test from "node:test";
// creating /  updating user info
export async function PUT(req) {
  let response;
  const body = await req.json();
  const userInfoSchema = schema;
  const {
    id,
    createdAt,
    updatedAt,
    userId,
    ...safeBody
  } = body;
  const zodCheck = userInfoSchema().safeParse(safeBody);
  if (!zodCheck) {
    response = {
      success: false,
      status: 400,
      message: "Validation fails",
      error: zodCheck.error,
    };

    return new Response(JSON.stringify(response));
  }

  // return message if session not available
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  console.log("safebody ", safeBody);
  try {
    const result = await prisma.userInfo.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        // Personal Info
        firstName: safeBody.firstName,
        lastName: safeBody.lastName,
        country: safeBody.country,
        gender: safeBody.gender,
        about: safeBody.about,
        city: safeBody?.city,
        profilePic: safeBody?.profilePic || undefined,

        // Professional Info
        profession: safeBody.profession,
        skills: safeBody.skills,
        certificates: safeBody.certificates,

        // Academic Info
        tenthMarks: safeBody?.tenthMarks,
        twelfthMarks: safeBody?.twelfthMarks,
        schoolName: safeBody.schoolName,
        collegeName: safeBody?.collegeName,
        graduationCourse: safeBody?.graduationCourse,
        graduationMarks: safeBody?.graduationMarks,
        postgrad: safeBody?.postgrad,
        postgradMarks: safeBody?.postgradMarks,
        postgradSpecialization: safeBody?.postgradSpecialization,
        phd: safeBody?.phd,
        phdSpecialization: safeBody?.phdSpecialization,

        // Contact Info
        phoneNo: safeBody?.phoneNo || undefined,
        linkedIn: safeBody?.linkedIn || undefined,
        github: safeBody?.github || undefined,
      },
      create: {
        // Personal Info (mandatory)
        firstName: safeBody.firstName,
        lastName: safeBody.lastName,
        country: safeBody.country,
        gender: safeBody.gender,
        about: safeBody.about,

        // Personal Info (optional)
        city: safeBody?.city,
        profilePic: safeBody?.profilePic || undefined,

        // Professional Info (mandatory)
        profession: safeBody.profession,
        skills: safeBody.skills,
        certificates: safeBody.certificates,

        // Academic Info
        tenthMarks: safeBody?.tenthMarks,
        twelfthMarks: safeBody?.twelfthMarks,
        schoolName: safeBody.schoolName,
        collegeName: safeBody?.collegeName,
        graduationCourse: safeBody?.graduationCourse,
        graduationMarks: safeBody?.graduationMarks,
        postgrad: safeBody?.postgrad,
        postgradMarks: safeBody?.postgradMarks,
        postgradSpecialization: safeBody?.postgradSpecialization,
        phd: safeBody?.phd,
        phdSpecialization: safeBody?.phdSpecialization,

        // Contact Info (optional + empty string allowed)
        phoneNo: safeBody?.phoneNo || undefined,
        linkedIn: safeBody?.linkedIn || undefined,
        github: safeBody?.github || undefined,

        // Relation
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
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }

  let user = null;
  let response;
  try {
    user = await prisma.userInfo.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    console.log("user info data ", user);
    console.log("user id ", session.user.id);

      if (user) {
        response = {
          success: true,
          isAvailable: true,
          status: 200,
          message: "Welcome",
          user: user,
        };
      } else {
        response = {
          success: true,
          isAvailable: false,
          status: 404,
          message: "Data not available kindly fill user info data",
        };
      }
    } catch (error) {
      response = {
        success: false,
        status: 500,
        message: "some error occured while fetching user info data",
        error: error,
      };
    } 
    return new Response(JSON.stringify(response));
  }
