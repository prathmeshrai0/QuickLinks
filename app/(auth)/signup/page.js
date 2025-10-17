import React from "react";
import SignInPage from "@/components/Pages/loginPage/SignInPage";



const Signup = async ({ searchParams }) => {
  let data = await searchParams;
 
  
  

  return <SignInPage username={data.username} />;
};

export default Signup;
