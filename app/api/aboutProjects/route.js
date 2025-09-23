import prisma from "@/prisma/connectDb";
import { isSessionAvailable } from "@/utlis";
const  isProjectCountLimitReached  = async (userId)=>{
const projectsCount =  await prisma.allProjects.count({
  where :{
    userId:userId 
  }
 }) 
 
 return (projectsCount   >= 10 )
}
// to update projects
export async function PUT(req) {
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  let response;
  const body = await req.json();
  const projects = body.projects;

  projects.forEach(obj => {
    delete obj.tag;
    delete obj.createdAt;
    delete obj.updatedAt;

    obj.userId = session.user.id;
  });
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
            thumbnail: projectObj.thumbnail,
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
 

  return new Response(JSON.stringify(response));
}

// to save projects
export async function POST(req) {
  let response;
  const session = await isSessionAvailable();
  if (session?.success === false) {
    return new Response(JSON.stringify(session));
  }
  const isLimitReached = await isProjectCountLimitReached(session.user.id) ;
  if(isLimitReached)
  { 
    
    response = {
      success: false,
      status: 429,
      message: "Project maximum limit reached", 
    };
    return new Response(JSON.stringify(response));
  }
  const body = await req.json();
  const projects = body.projects;
  projects.forEach(obj => {
    delete obj.tag;
    delete obj.id;
    obj.userId = session.user.id;
  });

  console.log(projects);
  
  try {
    const createdProjects = await prisma.allProjects.createMany({
      data: projects,
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

  // return new Response(JSON.stringify({ response: "hellow" }));
  return new Response(JSON.stringify(response));
}

// to delete projects
export async function DELETE(req) {
  let response;
  const session = await isSessionAvailable();
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
  let response;
  const session = await isSessionAvailable();
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
    obj.tag = "";
  });

  const { id, userId, createdAt, updatedAt } = Projects;
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
