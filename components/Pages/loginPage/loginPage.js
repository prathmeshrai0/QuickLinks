"use client";
import Logo from "@/assets/Logo";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SocialButton from "./socialButton";
import validator from "validator";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper";
const LoginPage = props => {
  const [form, setform] = useState({
    email: "",
    username: "",
    password: "",
    unknown: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();

  const { data: session } = useSession();
  const router = useRouter();
  const formValues = watch();

  const handelChange = e => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const submit = async e => {
    const isEmailGiven = validator.isEmail(e.unknown);
    let sendingData;
    if(e.unknown.length )
    if (isEmailGiven) {

      const { password, unknown } = e
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(unknown)) {


        let email = unknown;

        sendingData = {
          email,
          password,
          redirect: false,
          isSignUp: false,
          givenUsername: false,
        };
      }
      else {
        setError("unknown", { type: "manual", message: "Invalid email format" });
      }
    } else {
      const { password, unknown } = e

      if (!/\s/.test(unknown)) { 
        
        let username = unknown;

        sendingData = {
          username,
          password,
          redirect: false,
          isSignUp: false,
          givenUsername: true,
        };
      }
      else{
        setError("unknown", { type: "manual", message: "Username cannot contain spaces" });
      }
    }
 

    let res = await signIn("credentials", sendingData);

    if (res.error) {
      alert(res.error);
    }
  };
  const toggle = () => {
    router.push("/login?action=signup");
  };

  useEffect(() => {
    reset(RetriveFromLocalStorage("login"));
  }, []);

  // save form data to localStorage
  useEffect(() => {
    SaveToLocalStorage("login", formValues);
  }, [formValues]);

  useEffect(() => {
    if (session?.user) {
      fetch("api/user")
        .then(res => res.json())
        .then(data => {
          if (data.isAvailable) {
            router.push("project");
          } else {
            router.push("user-info");
          }
        });
    }
  }, [session]);


  return (
    <main className="box border  flex h-screen ">
      <section className="left  border   md:w-1/2 w-full  bg-white  text-black max-h-screen overflow-y-scroll ">
        <Logo customClass="h-20 " />
        <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center md:text-sm text-xs ">
          <header className="text-center">
            <h1 className="    text-3xl font-bold">Welcome Back</h1>
            <p className=" text-base   text-gray-500">
              Log in to your QuickLinks
            </p>
          </header>

          <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col    gap-1.5">
            {errors.unknown && (
              <p className="text-red-500">{errors.unknown.message}</p>
            )}
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="email or username"
              name="unknown"
              {...register('unknown',{
                required:"This field is require"
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="password"
              placeholder="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  nospace: value =>
                    !/\s/.test(value) || "Cannot contain spaces",
                  hasUpper: value =>
                    /[A-Z]/.test(value) ||
                    "Must include at least one uppercase letter",
                  hasLower: value =>
                    /[a-z]/.test(value) ||
                    "Must include at least one lowercase letter",
                  hasNumber: value =>
                    /[0-9]/.test(value) || "Must include at least one number",
                  hasSpecial: value =>
                    /[^A-Za-z0-9]/.test(value) ||
                    "Must include at least one special character",
                },
              })}
            />
            <button
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