import prisma from "@/prisma/connectDb";
import { isSessionAvailable } from "@/utlis";
import { schema } from "@/components/Pages/ProjectsPage/schema/projects-schema"
const isProjectCountLimitReached = async (userId) => {
  const projectsCount = await prisma.allProjects.count({
    where: {
      userId: userId,
    },
  });
  if (projectsCount >= 10) {
    response = {
      success: false,
      status: 429,
      message: "Project maximum limit reached",
    };
    return new Response(JSON.stringify(response));
  }
};
// to update projects
export async function PUT(req) {
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  let response;
  const body = await req.json();
  const projects = body.projects?.TotalProjects;

  const zodCheck = schema.safeParse(projects);
  if (!zodCheck) {
    response = {
      success: false,
      status: 400,
      message: "Validation fails",
      error: zodCheck.error,
    };

    return new Response(JSON.stringify(response));
  }

  projects.forEach(obj => {
    delete obj.createdAt;
    delete obj.updatedAt;

    obj.userId = session.user.id;
    let index = 0;
    obj.techStack.forEach(techStackObj => {
      obj.techStack[index++] = techStackObj.tag;
    })
  });
  console.log(projects)
  try {
    const updatedProjects = await Promise.all(
      projects.map(projectObj => {
        return prisma.allProjects.update({
          where: {
            id: projectObj.id,
          },
          data: {
            title: projectObj.title,
            description: projectObj.description,
            category: projectObj.category,
            subcategory: projectObj.subcategory,
            thumbnail: projectObj?.thumbnail,
            link: projectObj.link,
            techStack: projectObj.techStack,
            userId: projectObj.userId,
          },
        });
      })
    );
    response = {
      success: true,
      status: 200,
      dataSaved: updatedProjects.length,
      message: "Projects data saved",
    };
  } catch (error) {
    response = {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error,
    };
  }
  // return new Response({ testing: true })
  return new Response(JSON.stringify(response));
}

// to save projects
export async function POST(req) {
  const session = await isSessionAvailable();
  let response;
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  await isProjectCountLimitReached(session.user.id);

  const body = await req.json();
  const projects = body.projects?.TotalProjects;

  projects.forEach(obj => {
    delete obj.id;
    obj.userId = session.user.id;

    let index = 0;
    obj.techStack.forEach(techStackObj => {
      obj.techStack[index++] = techStackObj.tag;
    })
  });
  console.log(projects)

  try {
    const createdProjects = await prisma.allProjects.createMany({
      data: projects
    });
    response = {
      success: true,
      status: 201,
      dataSaved: createdProjects,
      message: "Projects data updated",
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

// to delete projects
export async function DELETE(req) {
  const session = await isSessionAvailable();
  let response;
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  const body = await req.json();
  const id = body.id;

  try {
    await prisma.allProjects.delete({
      where: {
        id: id,
      },
    });
    response = {
      success: true,
      status: 204,
      message: "Successfully deleted project",
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

// used to get project according to session data
export async function GET(req) {
  const session = await isSessionAvailable();
  let response;
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }

  const Projects = await prisma.allProjects.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // deleting unecessary data and adding tag so not to face uncontrolled input error in react
  Projects.forEach(obj => {
    delete obj.userId;
  });
 
  if (Projects) {
    response = {
      success: true,
      status: 200,
      message: "Projects fetched",
      projects: Projects,
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
