"use client";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { authFormSchema } from "./schema/sign-in-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DeleteFromLocalStorage,
  fetchFunction,
  RetriveFromLocalStorage,
  SaveToLocalStorage,
} from "@/utlis";
import { toast } from "react-toastify";

type FormType = "signin" | "signup";
const SIGN_IN = "sign-in";
const SIGN_UP = "sign-up";
export default function (FormType: FormType, username: string) {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const formSchema = authFormSchema(FormType);
  const { data: session } = useSession();
  type FormValuesType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormValuesType>({
    resolver: zodResolver(formSchema),
  });
  const LSKey: FormType = FormType;
  const formFieldsValue = watch();
  const [isShowPassword, setisShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValuesType> = async data => {
    const sendingData = { ...data, FormType };

    let res = await signIn("credentials", { ...sendingData, redirect: false });
    if (res?.error) {
      console.error(res.error);

      toast(res.error);
    }
  };
  const togglePassword = () => {
    setisShowPassword(!isShowPassword);
  };
  
  useEffect(() => {
    reset(RetriveFromLocalStorage(LSKey));
  }, []);
  useEffect(() => {
    pathname === "/sign-in" ? setCurrentPage(SIGN_IN) : setCurrentPage(SIGN_UP);
  }, [pathname]);


    useEffect(() => { 
    if (username) setValue("username", username);
     
  }, [username, setValue]);

  useEffect(() => {
    SaveToLocalStorage(LSKey, formFieldsValue);
  }, [formFieldsValue]);
  useEffect(() => {
    if (session?.user) {
      fetchFunction("/api/user").then(data => {
        console.log("user info fetch response ", data);
        console.log("session user ", session.user);
        if (data.success) {
          DeleteFromLocalStorage(LSKey);
          if (data.isAvailable) {
            // router.push("project");
            console.log("push to projects" );
          } else {
            // router.push("user-info");
            console.log("push to user-info" );
          }
        } else {
          console.error(data.error);
          toast(data.message);
        }
      });
    }
  }, [session]);

  const toggle = () => {
    if (currentPage === SIGN_IN) {
      router.push("/" + SIGN_UP);
    } else {
      router.push("/" + SIGN_IN);
    }
  };
  function currentPageIsSignIn<T>(val1: T, val2: T) {
    if (currentPage === SIGN_IN) {
      return val1;
    } else {
      return val2;
    }
  } 
  return {
    currentPage,
    setCurrentPage,
    router,
    pathname,
    formSchema,
    session,
    LSKey,
    formFieldsValue,
    isShowPassword,
    setisShowPassword,
    onSubmit,
    togglePassword,
    toggle,
    currentPageIsSignIn,
    register,
    handleSubmit,
    errors, 
  };
}
