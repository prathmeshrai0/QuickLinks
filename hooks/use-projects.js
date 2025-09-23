"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DeleteFromLocalStorage, RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper";
import categories_subCat from "@/components/Pages/ProjectsPage/categories_subCat";
import { fetchFunction } from "@/utlis";

export default updateInfo => {
  const [updateInfoValue, setUpdateInfoValue] = useState(
    JSON.parse(updateInfo)
  );

  const categories = categories_subCat.categories;
  const subcategoryMap = categories_subCat.subcategoryMap;
  const form = {
    title: "",
    description: "",
    category: "",
    subcategory: "",
    thumbnail: "",
    link: "",
    tag: "",
    techStack: [],
  };
  const { data: session, status } = useSession();
  const [TotalProjects, setTotalProjects] = useState([form]);
  const [ProjectsAlreadyPresent, setProjectsAlreadyPresent] = useState(false);
  const router = useRouter();
  const LSKey = "TotalProjects";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    setUpdateInfoValue(updateInfo);
  }, [updateInfo]);

  useEffect(() => {
    const RETRIVED_DATA = RetriveFromLocalStorage(LSKey);

    if (updateInfoValue) {
      fetchFunction("api/aboutProjects").then(data => {
        if (data.success) {
          const projects = data.projects;

          const mergedRedundant = Array.from([
            ...projects,
            ...(RETRIVED_DATA ?? []),
          ]);

          //   using Map to get unique id only
          const map = new Map(
            mergedRedundant.map(p => {
              return [p.id, p];
            })
          );
          //   getting only the objects
          const merged = Array.from(map)
            .map(ele => {
              if (ele[1].id) return ele[1];
              else return null;
            })
            .filter(Boolean);

          setTotalProjects(merged);

          setProjectsAlreadyPresent(true);
        }
      });
    } else {
      if (RETRIVED_DATA) {
        setTotalProjects([...RETRIVED_DATA]);
      }
    }
  }, []);

  useEffect(() => {
    SaveToLocalStorage(LSKey, TotalProjects);
  }, [TotalProjects]);

  useEffect(() => {
    if (TotalProjects.length > 1) {
      window.scrollBy({ top: 580, behavior: "smooth" });
    } else if (TotalProjects.length === 0) {
      alert(`you don't have any projects first add `);
      setTotalProjects([form]);
    }
  }, [TotalProjects.length]);

  const handleChange = (e, key) => {
    let name = e.target.name;
    let value = e.target.value;

    const updatedProjects = [...TotalProjects];
    updatedProjects[key] = {
      ...updatedProjects[key],
      [name]: value,
    };

    if (name === "tag") {
      let currentForm = updatedProjects[key];

      if (currentForm.tag.endsWith(",") && currentForm.tag.length > 1) {
        let newTag = currentForm.tag.slice(0, -1);

        let updatedTags = [...currentForm["techStack"], newTag];

        currentForm = {
          ...currentForm,
          ["techStack"]: updatedTags,
          ["tag"]: "",
        };
      } else if (currentForm.tag.endsWith(",") && currentForm.tag.length < 2) {
        alert("You need to add a tag ");
      }
      updatedProjects[key] = currentForm;
    }

    setTotalProjects(updatedProjects);
  };

  const removeTag = (e, key, tagKey) => {
    const currentProjectObject = TotalProjects[key];
    currentProjectObject.techStack.splice(tagKey, 1);

    TotalProjects[key] = currentProjectObject;
    setTotalProjects([...TotalProjects]);
  };
  const handleAdd = (e, key) => {
    e.preventDefault();
    if (TotalProjects.length >= 5) {
      alert("Maximum limit reached ! Currently you can add only 10 projects. We are working on it, HANG TIGHT !!!");
      return;
    }
    setTotalProjects([...TotalProjects, form]);
  };
  const handleDelete = key => {
    let c = confirm("Are you sure you want to delete this Project!");
    if (c) {
      if (key === 0) {
        setTotalProjects([form]);
      } else {
        if (updateInfoValue) {
          const id = TotalProjects[key].id;
          // delete from db
          fetchFunction("api/aboutProjects", { id: id }, "DELETE");
          TotalProjects.splice(key, 1);
          setTotalProjects([...TotalProjects]);
        } else {
          TotalProjects.splice(key, 1);
          setTotalProjects([...TotalProjects]);
        }
      }
    }
  };
  const isTitleLengthMore = () => {
    let res = TotalProjects.every(obj => {
      if (obj.title.length < 100) {
        return true;
      }
      return false;
    });
    return !res;
  };

  const isDescLengthMore = () => {
    let res = TotalProjects.every(obj => {
      if (obj.description.length < 200) {
        return true;
      }
      return false;
    });
    return !res;
  };
  const isTechStackOutOfLimit = () => {
    let res = TotalProjects.every(obj => {
      if (obj.techStack.length > 0 && obj.techStack.length < 7) {
        return true;
      }
      return false;
    });
    return !res;
  };
  const handleSubmit = async e => {
    e.preventDefault();

    if (isTitleLengthMore()) {
      alert("Title words limit reached");

      return false;
    }
    if (isDescLengthMore()) {
      alert("Description words limit reached");
      return false;
    }
    if (isTechStackOutOfLimit()) {
      alert("Kindly add minimun one #Tag and max to your Projects , max 6 ");
      return false;
    }
    const payLoad = {
      projects: TotalProjects,
    };

    if(updateInfo){
      fetchFunction("/api/aboutProjects", payLoad, "PUT").then(data => {
        if(data.success){
          DeleteFromLocalStorage(LSKey)
          router.push("update-info"  );

        }
        else{
          console.log(data.error);
          alert(data.message)
          
        }
      });
      
    }else{
      fetchFunction("/api/aboutProjects", payLoad, "POST").then(data => {
        if(data.success){
          DeleteFromLocalStorage(LSKey)
          router.push("portfolio/" + session.user.username);
          
        }
        else{
          console.log(data.error);
          alert(data.message)
          
        }
      });
      
    }
       
  };

  return {
    categories,
    subcategoryMap,
    TotalProjects,
    ProjectsAlreadyPresent,
    updateInfoValue,
    router,
    handleChange,
    removeTag,
    handleAdd,
    handleSubmit,
    handleDelete,
  };
};
