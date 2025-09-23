import Projects from "@/components/Pages/ProjectsPage/Projects";

 
const userDashboard = async ({searchParams}) => {

  const searchParamsData = await searchParams   
  
    return (
        <>
            <Projects updateInfo={searchParamsData.update === 'true' ?? false} />
        </>
    );
};

export default userDashboard;
