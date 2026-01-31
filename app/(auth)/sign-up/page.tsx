import React, { Suspense } from "react";
import AuthForm from "@/components/Pages/signIn_signUp/AuthForm"
import LoadingPage from "@/components/Pages/Loading/LoadingPage";


const Signup = async ({ searchParams }: { searchParams: String }) => {
  let data = await searchParams;

 return <Suspense fallback={<LoadingPage />}>

    <AuthForm FormType={'signup'} />
  </Suspense>

};

export default Signup;
