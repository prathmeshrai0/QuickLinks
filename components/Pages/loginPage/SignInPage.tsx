"use client";
import React, { useState, useEffect, useRef } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper.js";
import EyeOpen from "@/assets/EyeOpen.js";
import EyeClosed from "@/assets/EyeClose.js";
import { DeleteFromLocalStorage, fetchFunction } from "@/utlis/index";

type Inputs = {
  email: string;
  username: string;
  password: String;
};
const SignInPage = ({ username }: { username: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>();

  const { data: session } = useSession();
  const router = useRouter();
  const formValues = watch();
  const [isShowPassword, setisShowPassword] = useState(false);
  const LSKey = "signin";

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs): Promise<void> => {
    type sendingDataType = Inputs & { redirect: boolean; isSignUp: boolean };
    const { email, username, password } = data;
    const sendingData: sendingDataType = {
      email,
      username,
      password,
      redirect: false,
      isSignUp: true,
    };

    let res = await signIn("credentials", sendingData);

    console.log(res);
    
    if (res?.error) {
      alert(res.error);
    }
  };
  
  const togglePassword = () => {
    setisShowPassword(!isShowPassword);
  };

  useEffect(() => {
    reset(RetriveFromLocalStorage(LSKey));
  }, []);

  useEffect(() => {
    if (username) {
      console.log(username);

      setValue("username", username);
    }
  }, [username]);

  // save form data to localStorage
  useEffect(() => {
    SaveToLocalStorage(LSKey, formValues);
  }, [formValues]);

  useEffect(() => {
    if (session?.user) {
      fetchFunction("api/user").then(data => {
        if (data.success) {
          if (data.isAvailable) {
            router.push("project");
          } else {
            router.push("user-info");
          }
        } else {
          console.error(data.error);
          console.log(data.message);
        }
      });
    }
  }, [session]);

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col    gap-1.5"
    >
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
        type="text"
        placeholder="email"
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
        {...register("username", {
          required: "Username is required",
          validate: value =>
            !/\s/.test(value) || "Username cannot contain spaces",
        })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <div className=" relative ">
        <input
          className="custom-button cursor-auto bg-gray-200 font-light rounded-lg border w-full "
          type={isShowPassword ? "text" : "password"}
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          {isShowPassword ? (
            <EyeClosed className={""} />
          ) : (
            <EyeOpen className={""} />
          )}
        </button>
      </div>
      <button
        type="submit"
        className="custom-button rounded-lg bg-black text-white   "
      >
        Continue
      </button>
    </form>
  );
};

export default SignInPage;
