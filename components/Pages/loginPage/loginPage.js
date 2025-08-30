"use client";
import Logo from "@/assets/Logo";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SocialButton from "./socialButton";
import validator from "validator";
import { useRouter } from "next/navigation"; 
const LoginPage = props => {
  const { data: session } = useSession();
  const [form, setform] = useState({
    email: "test@email.com",
    username: "testUSername",
    password: "TEst passw",
    unknown: "test@email.com",
  });
  const router = useRouter();

  const handelChange = e => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async e => {
    e.preventDefault();

    const isEmailGiven = validator.isEmail(form.unknown);
    let sendingData;
    if (isEmailGiven) {
      let { email, password, unknown } = form;
      email = unknown;

      sendingData = {
        email,
        password,
        redirect: false,
        isSignUp: false,
        givenUsername: false,
      };
    } else {
      let { username, password, unknown } = form;
      username = unknown;

      sendingData = {
        username,
        password,
        redirect: false,
        isSignUp: false,
        givenUsername: true,
      };
    }

    let res = await signIn("credentials", sendingData);

    if (res.error) {
      alert(res.error);
    }
  };
 const toggle = () => { 
     
    router.push('/login?action=signup')
  };
  useEffect(() => {
    if (session?.user) {
      fetch("api/user")
        .then(res => res.json())
        .then(data => {
      
          
          if (data.isAvailable) {
            router.push("dashboard");
          } else {
            router.push("userinfo");
          }
        });
    }
  }, [session]);

  return (
    <main className="box border  flex h-screen ">
      <section className="left  border   md:w-1/2 w-full  bg-white  text-black max-h-screen overflow-y-scroll ">
        <Logo customClass="h-20 " />
        <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center md:text-sm text-xs " >
          <header className="text-center">
            <h1 className="    text-3xl font-bold">Welcome Back</h1>
            <p className=" text-base   text-gray-500">
              Log in to your QuickLinks
            </p>
          </header>

          <form action="" className="flex flex-col    gap-1.5">
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="email or username"
              name="unknown"
              value={form.unknown}
              onChange={handelChange}
            />
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="password"
              placeholder="password"
              value={form.password}
              name="password"
              onChange={handelChange}
            />
            <button
              onClick={handelSubmit}
              className="custom-button rounded-lg bg-black text-white"
            >
              Continue
            </button>
          </form>
          <h3 className="text-center">OR</h3>
          <div className="authLogin">
            <SocialButton />
          </div>
          {/* <div className="reset flex gap-0.5  justify-center items-center text-purple-500  font-medium [&>*]:cursor-pointer">
            <span>Forgot username ?</span>
            <span className="font-bold "> . </span>
            <span> Forgot password ?</span>
          </div> */}
          <div className="toggle flex justify-center items-center">
            <p>Doesn&apos;t have an account?</p>
            <button
              onClick={toggle}
              className="text-purple-500  font-medium cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </section>
      <section className="right border max-w-1/2   hidden">
        right image here
      </section>
    </main>
  );
};

export default LoginPage;
