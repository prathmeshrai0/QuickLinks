"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DeleteFromLocalStorage,
  RetriveFromLocalStorage,
  SaveToLocalStorage,
} from "@/utlis/helper";
import categories_subCat from "@/components/Pages/ProjectsPage/categories_subCat";
import { fetchFunction } from "@/utlis";
import { toast } from "react-toastify";
import { schema } from "../schema/projects-schema";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import zod, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default (updateInfo: boolean) => {
  const categories = categories_subCat.categories;
  const subcategoryMap = categories_subCat.subcategoryMap;
  type Category = keyof typeof subcategoryMap;
  const projectSchema = schema;
  type FormType = zod.infer<typeof projectSchema>;
  const useFormMethods = useForm<FormType>({
    resolver: zodResolver(projectSchema) as any,
    mode: "onChange",
    // defaultValues: {
    //   TotalProjects: [
    //     {
    //       title: "",
    //       description: "",
    //       category: "Web Development",
    //       subcategory: "",
    //       thumbnail: "",
    //       link: "",
    //       techStack: [{ tag: "" }],
    //     },
    //   ],
    // },
  });
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
  } = useFormMethods;
  const projectDataValue = watch();

  const { data: session, status } = useSession();

  const [ProjectsAlreadyPresent, setProjectsAlreadyPresent] = useState(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const router = useRouter();
  const LSKey = "TotalProjects";

  const projectsArray = useFieldArray<FormType>({
    control,
    name: "TotalProjects",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    const RETRIVED_DATA = RetriveFromLocalStorage(LSKey);
    if (updateInfo && !dataLoaded) {
      fetchFunction("/api/aboutProjects").then(data => {
        if (data.success) {
          let arr = [...data.projects];

          arr.forEach(item => {
            let index = 0;
            item.techStack?.forEach(element => {
              item.techStack[index++] = { tag: element };
            });
          });

          const mergerdData = [...data.projects];
          reset({ TotalProjects: mergerdData });
          setDataLoaded(true);
        }
      });
    } else {
      if (
        RETRIVED_DATA?.TotalProjects &&
        RETRIVED_DATA.TotalProjects.length > 0
      ) {
        reset(RETRIVED_DATA);
      }
    }
  }, []);  
  useEffect(() => {
    SaveToLocalStorage(LSKey, projectDataValue);
  }, [projectDataValue, updateInfo, dataLoaded]); 
  const Submit = async () => {
    const payLoad = {
      projects: projectDataValue,
    };
    if (updateInfo) {
      fetchFunction("/api/aboutProjects", payLoad, "PUT").then(data => {
        if (data.success) {
          DeleteFromLocalStorage(LSKey); 
          router.push("update-info");
          toast.success("Projects info updated successfully");
        } else {
          toast.error(data.message);
          console.log(data)
        }
      });
    } else {
      fetchFunction("/api/aboutProjects", payLoad, "POST").then(data => {
        if (data.success && session) {
          DeleteFromLocalStorage(LSKey);
          router.push("portfolio/" + session.user.username);
          toast.success("Projects info submitted successfully");
        } else {
          toast.error(data.message);
          console.log(data)
        }
      });
    }
  };

  return {
    categories,
    subcategoryMap,

    updateInfo,
    router,

    Submit,

    // RHF
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
    projectDataValue,

    projectsArray,

    useFieldArray,
  };
};
