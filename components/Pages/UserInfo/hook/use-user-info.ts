"use client";
import { useState, useEffect, useRef } from "react";

import {
  DeleteFromLocalStorage,
  fetchFunction,
  RetriveFromLocalStorage,
  SaveToLocalStorage,
} from "@/utlis";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "../schema/schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const defaultForm = {
  // Personal Info
  firstName: "",
  lastName: "",
  country: "",
  gender: "",
  city: "",
  profilePic: "",
  about: "",

  // Professional Info
  profession: "",
  skills: [""],

  // Academic Info
  tenthMarks: "",
  twelfthMarks: "",
  schoolName: "",
  collegeName: "",
  graduationCourse: "",
  graduationMarks: "",
  postgrad: "",
  postgradMarks: "",
  postgradSpecialization: "",
  phd: "",
  phdSpecialization: "",

  // Projects and Certification link
  certificates: [{ title: "", link: "" }],

  // Contact Info
  phoneNo: "",
  linkedIn: "",
  github: "",
};

export function useUserInfo(
  updateInfo: boolean,
  session: Session | null,
  router: AppRouterInstance,
  status: "authenticated" | "unauthenticated" | "loading",
) {
  const [certificationStack, setcertificationStack] = useState({
    title: "",
    link: "",
  });
  const [form, setform] = useState({ ...defaultForm });
  const [Dbdata, setDbdata] = useState();
  const [skills, setskills] = useState<string[]>([]);
  const LSKey = "user-info";
  const formSchema = schema();

  const {
    register,
    formState: { errors },
    watch,
    reset,
    control,
    trigger,
    clearErrors,
    setError,
    setValue,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    mode: "onChange",
  });
  const formFieldsValue = watch();
  useEffect(() => {
    // // used for handling updates
    const RETRIVED_DATA = RetriveFromLocalStorage(LSKey);
    if (updateInfo) {
      fetchFunction("api/user").then(data => {
        setDbdata(data.user);
        for (const key in data.user) {
          if (data.user[key] === null) {
            data.user[key] = undefined;
          }
        }

        const mergerdData = { ...data.user, ...(RETRIVED_DATA ?? {}) };
        reset(mergerdData);
      });
    } else {
      if (RETRIVED_DATA) {
        reset(RETRIVED_DATA);
      }
    }
  }, []);
  useEffect(() => {
    SaveToLocalStorage(LSKey, formFieldsValue);
  }, [formFieldsValue]);

  useEffect(() => {
    setform(prev => ({ ...prev, ["skills"]: skills }));
  }, [skills]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
    if (status === "authenticated") {
      if (session?.user?.image) {
        setform(prev => ({ ...prev, ["profilePic"]: session.user.image }));
      }
    }
  }, [status, router]);

  const handleChange = (e: any) => {
    const element = e.target.name;
    const value = e.target.value;

    setform({ ...form, [element]: value });
  };

  const convertInputTypeNumToNumber = () => {
    const { tenthMarks, twelfthMarks, graduationMarks, postgradMarks } =
      formFieldsValue;
    return {
      ...formFieldsValue,
      tenthMarks: Number(tenthMarks),
      twelfthMarks: Number(twelfthMarks),
      graduationMarks: Number(graduationMarks),
      postgradMarks: Number(postgradMarks),
    };
  }; 
  const Submit = async () => {
    const payLoad = formFieldsValue;
    for (const key in formFieldsValue) {
      if (typeof formFieldsValue[key] === "string") {
        payLoad[key] = formFieldsValue[key].trim();
        if (updateInfo) {
          if (payLoad[key] === "" && Dbdata) {
            if (Dbdata[key] === "") {
              payLoad[key] = undefined;
            } else {
              payLoad[key] = null;
            }
          }
        } else {
          payLoad[key] = formFieldsValue[key].trim();
          if (payLoad[key] === "") {
            payLoad[key] = undefined;
          }
        }
      }
    }
    fetchFunction("/api/user", payLoad, "PUT").then(data => {
      console.log("response from user info api ", data);
      if (data.success) {
        DeleteFromLocalStorage(LSKey);
        toast(data.message, {
          type: "success"
        });
        if (updateInfo) {
          router.push("update-info");
        } else {
          router.push("project");
        }
      } else {
        console.error(data.error);
        toast(data.message, {
          type: "error"
        });
      }
    });
  };
  return {
    form,
    setform,
    skills,
    setskills,
    certificationStack,
    setcertificationStack,
    formFieldsValue,
    handleChange,
    handleSubmit,
    register,
    errors,
    control,
    trigger,
    clearErrors,
    watch,
    setError,
    setValue,
    Submit,
  };
}
