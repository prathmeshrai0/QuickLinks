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
    defaultValues: {
      TotalProjects: [
        {
          title: "",
          description: "",
          category: "Web Development",
          subcategory: "",
          thumbnail: "",
          link: "",
          techStack: [{tag: "empty test tag"}],
        },
      ],
    },
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

    // if (updateInfo) {
    //   fetchFunction("/api/aboutProjects").then(data => {
    //     if (data.success) {
    //       const projects = data.projects;

    //       const mergedRedundant = Array.from([
    //         ...projects,
    //         ...(RETRIVED_DATA ?? []),
    //       ]);

    //       //   using Map to get unique id only
    //       const map = new Map(
    //         mergedRedundant.map(p => {
    //           return [p.id, p];
    //         }),
    //       );
    //       //   getting only the objects
    //       const merged = Array.from(map)
    //         .map(ele => {
    //           if (ele[1].id) return ele[1];
    //           else return null;
    //         })
    //         .filter(Boolean);

    //       setTotalProjects(merged);

    //       setProjectsAlreadyPresent(true);
    //     }
    //   });
    // } else {
    //   if (RETRIVED_DATA) {
    //     setTotalProjects([...RETRIVED_DATA]);
    //   }
    // }

    // projectsArray.append({
    //   title: "",
    //   description: "",
    //   category: "Web Development",
    //   subcategory: "",
    //   thumbnail: "",
    //   link: "",
    //   techStack: [],
    // });
  }, []);
  // console.log("projectsArray.fields", projectsArray.fields );
  // useEffect(() => {
  //   SaveToLocalStorage(LSKey, TotalProjects);
  // }, [TotalProjects]);

  // useEffect(() => {
  //   if (TotalProjects.length > 1) {
  //     window.scrollBy({ top: 580, behavior: "smooth" });
  //   } else if (TotalProjects.length === 0) {
  //     toast.warn(`you don't have any projects Add Project first`);
  //     setTotalProjects([form]);
  //   }
  // }, [TotalProjects.length]);
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   key: number,
  // ) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   const updatedProjects = [...TotalProjects];
  //   updatedProjects[key] = {
  //     ...updatedProjects[key],
  //     [name]: value,
  //   };

  //   if (name === "tag") {
  //     let currentForm = updatedProjects[key];

  //     if (currentForm.tag.endsWith(",") && currentForm.tag.length > 1) {
  //       let newTag = currentForm.tag.slice(0, -1);

  //       let updatedTags = [...currentForm["techStack"], newTag];

  //       currentForm = {
  //         ...currentForm,
  //         ["techStack"]: updatedTags,
  //         ["tag"]: "",
  //       };
  //     } else if (currentForm.tag.endsWith(",") && currentForm.tag.length < 2) {
  //       alert("You need to add a tag ");
  //     }
  //     updatedProjects[key] = currentForm;
  //   }

  //   setTotalProjects(updatedProjects);
  // };
  // const removeTag = (key: number, tagKey: number) => {
  //   const currentProjectObject = TotalProjects[key];
  //   currentProjectObject.techStack.splice(tagKey, 1);

  //   TotalProjects[key] = currentProjectObject;
  //   setTotalProjects([...TotalProjects]);
  // };
  // const handleAdd = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (TotalProjects.length >= 5) {
  //     alert(
  //       "Maximum limit reached ! Currently you can add only 10 projects. We are working on it, HANG TIGHT !!!",
  //     );
  //     return;
  //   }
  //   setTotalProjects([...TotalProjects, form]);
  // };
  // const handleDelete = (key: number) => {
  //   let c = confirm("Are you sure you want to delete this Project!");
  //   if (c) {
  //     if (key === 0 && TotalProjects.length === 1) {
  //       setTotalProjects([form]);
  //     } else {
  //       if (updateInfo) {
  //         // delete from db
  //         const id = TotalProjects[key].id;
  //         fetchFunction("/api/aboutProjects", { id: id }, "DELETE");
  //         TotalProjects.splice(key, 1);
  //         setTotalProjects([...TotalProjects]);
  //       } else {
  //         TotalProjects.splice(key, 1);
  //         setTotalProjects([...TotalProjects]);
  //       }
  //     }
  //   }
  // };
  // const isTitleLengthMore = () => {
  //   let res = TotalProjects.every(obj => {
  //     if (obj.title.length < 100) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return !res;
  // };

  // const isDescLengthMore = () => {
  //   let res = TotalProjects.every(obj => {
  //     if (obj.description.length < 200) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return !res;
  // };
  // const isTechStackOutOfLimit = () => {
  //   let res = TotalProjects.every(obj => {
  //     if (obj.techStack.length > 0 && obj.techStack.length < 7) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return !res;
  // };
  // console.log(projectDataValue.TotalProjects[0].techStack);
  // console.log(projectDataValue.TotalProjects);
  // console.log(errors.TotalProjects?.[0]?.techStack);
  // console.log(errors.TotalProjects);
  console.log(  projectDataValue.TotalProjects);
  // console.log(projectsArray.fields)
  const Submit = async () => {
    console.log("Submitted project data:", projectDataValue);
    // e.preventDefault();

    // if (isTitleLengthMore()) {
    //   alert("Title words limit reached");

    //   return false;
    // }
    // if (isDescLengthMore()) {
    //   alert("Description words limit reached");
    //   return false;
    // }
    // if (isTechStackOutOfLimit()) {
    //   alert("Kindly add minimun one #Tag and max to your Projects , max 6 ");
    //   return false;
    // }
    // const payLoad = {
    //   projects: TotalProjects,
    // };

    // if (updateInfo) {
    //   fetchFunction("/api/aboutProjects", payLoad, "PUT").then(data => {
    //     if (data.success) {
    //       DeleteFromLocalStorage(LSKey);
    //       router.push("update-info");
    //     } else {
    //       toast.error(data.message);
    //     }
    //   });
    // } else {
    //   fetchFunction("/api/aboutProjects", payLoad, "POST").then(data => {
    //     console.log(data);

    //     if (data.success && session) {
    //       DeleteFromLocalStorage(LSKey);
    //       router.push("portfolio/" + session.user.username);
    //     } else {
    //       toast.error(data.message);
    //     }
    //   });
  };

  // type FromType = {
  //     TotalProjects: {
  //         techStack: string[];
  //         category: "Web Development" | "Mobile App" | "Data Science" | "Machine Learning" | "AI" | "Game Dev" | "Blockchain" | "Cybersecurity" | "IoT" | "Automation" | "UI UX" | "Open Source" | "Cloud" | "Desktop App" | "API Dev" | "Tools" | "Others";
  //         subcategory: string;
  //         title?: string;
  //         description?: string;
  //         link?: string;
  //         thumbnail?: string;
  //     }[];
  // }
  return {
    categories,
    subcategoryMap,
    // TotalProjects,
    ProjectsAlreadyPresent,
    updateInfo,
    router,
    // handleChange,
    // removeTag,
    // handleAdd,
    Submit,
    // handleDelete,

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
    useFormMethods
  };
};
