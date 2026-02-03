"use client";
import React from "react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo";
import SocialButton from "@/components/Pages/signIn_signUp/socialButton";
import Image from "next/image";
import EyeClosed from "@/assets/EyeClose";
import EyeOpen from "@/assets/EyeOpen";
import hooks from "./hooks";

import { useSearchParams } from 'next/navigation';
type FormType = "signin" | "signup";
const SIGN_IN = "sign-in";
const SIGN_UP = "sign-up";
const AuthForm = ({ FormType }: { FormType: FormType }) => {
  const params = useSearchParams();
  const username = params.get('username') ;
  const {
    currentPage,

    isShowPassword,
    onSubmit,
    togglePassword,
    toggle,
    currentPageIsSignIn,
    register,
    handleSubmit,
    errors,  
    LSKey,
  } = hooks(FormType , username);
  return (
    <main className="box border  flex h-screen ">
      <section className="left  border   lg:w-1/2 w-full  bg-white  text-black max-h-screen overflow-y-scroll    ">
        <Logo customClass="h-20 " />
        <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50  p-3.5 rounded-sm text-center md:text-sm text-xs     ">
          <header className="text-center">
            <h1 className="    text-3xl font-bold">
              {currentPageIsSignIn<string>(
                "Welcome Back",
                "Sign Up To Your Account"
              )}
            </h1>
            <p className=" text-base   text-gray-500">
              {currentPageIsSignIn<string>("Sign in", "Sign up")}  to your QuickLinks
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="   flex flex-col gap-9   border-blue-700"
          >
            <FieldSet className=" ">
              <FieldGroup className="  border-red-500">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...register("email")}
                    id="email"
                    autoComplete="on"
                    placeholder=""
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
                {FormType === "signin" && <p className="font-bold ">OR</p>}
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    {...register("username") }
                    id="username"
                    autoComplete="on"
                    aria-invalid={!!errors.username}
                  />
                  {errors.username && (
                    <FieldError>{errors.username.message}</FieldError>
                  )}
                </Field>
                <Field className="relative ">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...register("password")}
                    id="password"
                    autoComplete="off"
                    type={isShowPassword ? "text" : "password"}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute left-20 top-0 "
                  >
                    {isShowPassword ? <EyeClosed /> : <EyeOpen />}
                  </button>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer invert-100"
            >
              {/* <Spinner /> */}
              Submit
            </Button>
          </form>

          <h3 className="text-center">OR</h3>
          <div className="authLogin">
            <SocialButton  LSKey={LSKey}/>
          </div>

          {currentPage === SIGN_IN ? (
            <div className="toggle flex justify-center items-center">
              <p>Doesn&apos;t have an account?</p>
              <button
                onClick={toggle}
                className="text-purple-500  font-medium cursor-pointer"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="toggle flex justify-center items-center">
              <p>Already Registered</p>
              <button
                onClick={toggle}
                className="text-purple-500  font-medium cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="right relative border max-w-1/2 w-1/2   hidden lg:block  ">
        <Image
          src={FormType === "signin" ? "/login.jpg" : "/signin.jpg"}
          alt="Profile picture"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
    </main>
  );
};

export default AuthForm;
