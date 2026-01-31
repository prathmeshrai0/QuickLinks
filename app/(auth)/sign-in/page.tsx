import React, { Suspense } from "react";

import AuthForm from "@/components/Pages/signIn_signUp/AuthForm"
import LoadingPage from "@/components/Pages/Loading/LoadingPage";
const SignIn = () => {
  return <Suspense fallback={<LoadingPage />}>

    <AuthForm FormType={'signin'} />
  </Suspense>



};

export default SignIn;
