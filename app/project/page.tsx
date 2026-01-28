import Projects from "@/components/Pages/ProjectsPage/Projects";

 
const userDashboard = async ({searchParams} : {searchParams:{update?:string}}) => {

  const searchParamsData  = await searchParams   
 
 
  
    return (
        <>
            <Projects updateInfo={searchParamsData.update === 'true' } />
        </>
    );
};

export default userDashboard;
