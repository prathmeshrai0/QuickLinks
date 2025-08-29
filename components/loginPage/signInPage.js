import React, { useState, useEffect } from "react";
import Logo from "@/assets/Logo";
import SocialButton from "./socialButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignInPage = props => {
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();
  const router = useRouter();

  const submit = async e => {  

    const { email, username, password } = e;
 

    const sendingData = {
      email,
      username,
      password,
      redirect: false,
      isSignUp: true,
    };

    let res = await signIn("credentials", sendingData);

    if (res.error) {
      alert(res.error);
    }
  };
  useEffect(() => {
    if (props?.username) {
      setValue("username", props.username);
    }
  }, [props]);

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
      <section className="left  border max-w-1/2 w-1/2 bg-white  text-black max-h-screen overflow-y-scroll ">
        <Logo customClass="h-20 " />
        <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center text-sm">
          <header className="text-center">
            <h1 className="    text-3xl font-bold">Join QuickLinks</h1>
            <p className=" text-base   text-gray-500">
              Sign in to your QuickLinks
            </p>
          </header>

          <form
            action=""
            onSubmit={handleSubmit(submit)}
            className="flex flex-col    gap-1.5"
          >
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="username"
              name="username"
              {...register("username", {
                required: "Username is required",
                validate: value =>
                  !/\s/.test(value) || "Username cannot contain spaces",
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
              type="submit"
              className="custom-button rounded-lg bg-black text-white"
            >
              Continue
            </button>
          </form>
          <h3 className="text-center">OR</h3>
          {/* <div className="authLogin">google apple</div> */}
          {
            // (session) ? (<>Signed in as {session.user.email} <br /><button onClick={() => signOut()}>Sign out</button></>)
            //   :
            //   (<> Not signed in <br /><button onClick={() => signIn()}>Sign in</button></>)
          }

          <SocialButton />

          <div className="toggle flex justify-center items-center">
            <p>Already have an account?</p>
            <button
              onClick={props.toggle}
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
  );
};

export default SignInPage;
