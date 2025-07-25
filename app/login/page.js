"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoginPage from "@/components/loginPage/loginPage";
import SignInPage from "@/components/loginPage/signInPage";


const Login = () => {
  const searchParams = useSearchParams();

  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (searchParams.get("action") === "login") {
      setlogin(true);
    }
  }, [searchParams]);

  const toggle = () => {
    setlogin(prev => !prev);
  };

  return (
    <>
      {login ? (
        <LoginPage toggle={toggle} />

      ) : (
        <SignInPage toggle={toggle}/>

      )}
    </>
  );
};

export default Login;
