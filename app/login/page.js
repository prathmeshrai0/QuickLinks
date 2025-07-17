"use client";
import Logo from "@/assets/Logo";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
        <main className="box border  flex h-screen ">
          <section className="left  border max-w-1/2 w-1/2 bg-white  text-black  ">
            <Logo customClass="h-20 " />
            <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center text-sm">
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
                />
                <input
                  className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
                  type="text"
                  placeholder="password"
                />
                <button className="custom-button rounded-lg bg-black text-white">
                  Continue
                </button>
              </form>
              <h3 className="text-center">OR</h3>
              <div className="authLogin">google apple</div>
              <div className="reset flex gap-0.5  justify-center items-center text-purple-500  font-medium [&>*]:cursor-pointer">
                <span>Forgot username ?</span>
                <span className="font-bold "> . </span>
                <span> Forgot password ?</span>
              </div>
              <div className="toggle flex justify-center items-center">
                <p>Don't have an account?</p>
                <button
                  onClick={toggle}
                  className="text-purple-500  font-medium cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </div>
          </section>
          <section className="right border max-w-1/2 w-1/2">
            right image here
          </section>
        </main>
      ) : (
        <main className="box border  flex h-screen ">
          <section className="left  border max-w-1/2 w-1/2 bg-white  text-black  ">
            <Logo customClass="h-20 " />
            <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center text-sm">
              <header className="text-center">
                <h1 className="    text-3xl font-bold">Join QuickLinks</h1>
                <p className=" text-base   text-gray-500">
                  Sign in to your QuickLinks
                </p>
              </header>

              <form action="" className="flex flex-col    gap-1.5">
                <input
                  className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
                  type="text"
                  placeholder="email  "
                />
                <input
                  className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
                  type="text"
                  placeholder="username  "
                />
                <input
                  className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
                  type="text"
                  placeholder="password"
                />
                <button className="custom-button rounded-lg bg-black text-white">
                  Continue
                </button>
              </form>
              <h3 className="text-center">OR</h3>
              <div className="authLogin">google apple</div>

              <div className="toggle flex justify-center items-center">
                <p>Already have an account?</p>
                <button
                  onClick={toggle}
                  className="text-purple-500  font-medium cursor-pointer"
                >
                  Log in
                </button>
              </div>
            </div>
          </section>
          <section className="right border max-w-1/2 w-1/2">
            right image here
          </section>
        </main>
      )}
    </>
  );
};

export default Login;
