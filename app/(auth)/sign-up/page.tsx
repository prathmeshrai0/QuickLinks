import React from "react"; 
import AuthForm from "@/components/Pages/signIn_signUp/AuthForm"


const Signup = async ({ searchParams  } : {searchParams:String}) => {
  let data = await searchParams;
  
return  <AuthForm FormType= {'signup'}/>
  
};

  export default Signup;
