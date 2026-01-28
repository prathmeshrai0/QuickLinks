"use server"
import UserInfoPage from "@/components/Pages/UserInfo/index";
const Userinfo = async ({searchParams} ) => {
  
  const searchParamsData = await searchParams   
  
  return <UserInfoPage updateInfo={searchParamsData.update} />;
};

export default Userinfo;
