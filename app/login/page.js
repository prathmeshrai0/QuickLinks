"use client"
import React, { useState, useEffect } from "react";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginPage from "@/components/Pages/loginPage/loginPage";
import SignInPage from "@/components/Pages/loginPage/signInPage";


const Login = () => {
  const searchParams = useSearchParams(); 


  const [login, setlogin] = useState(false);
  const [username, setusername] = useState(null)
  useEffect(() => {
    if (searchParams.get("action") === "login") {
      setlogin(true);
    }
    if (searchParams.get('username')) {
      setusername(searchParams.get('username'));
    }

  }, [searchParams]);
 
  

  const toggle = () => {
    setlogin(prev => !prev);
  };

  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      {login ? (
        <LoginPage toggle={toggle} />
        
      ) : (
        <SignInPage toggle={toggle} username={username&& username}/>
        
      )}
      </Suspense>
    </>
  );
};

export default Login;
