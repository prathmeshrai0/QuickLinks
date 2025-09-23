import UserInfoPage from "@/components/Pages/UserInfo/UserInfoPage";
const Userinfo = async ({searchParams}) => {
  
  const searchParamsData = await searchParams  
  
  
  return <UserInfoPage updateInfo={searchParamsData.update} />;
};

export default Userinfo;
