"use client";
import React, { useState, useEffect } from "react";
import categories_subCat from "./categories_subCat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingPage from "../Loading/LoadingPage";
import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper";

const Dashboard = () => {
  const categories = categories_subCat.categories;
  const subcategoryMap = categories_subCat.subcategoryMap;
  const [form, setform] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    thumbnail: "",
    link: "",
    tag: "",
    techStack: [],
  });
  const { data: session, status } = useSession();
  const [TotalProjects, setTotalProjects] = useState([form]);
  const [ProjectsAlreadyPresent, setProjectsAlreadyPresent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (TotalProjects.length > 1) {
      window.scrollBy({ top: 580, behavior: "smooth" });
    }
  }, [TotalProjects.length]);

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      fetch("api/aboutProjects")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProjectsAlreadyPresent(true);
          }
        });
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, session]);

  useEffect(() => {
    const RETRIVED_DATA = RetriveFromLocalStorage("TotalProjects");
    setTotalProjects([...RETRIVED_DATA]);
  }, []);

  // save form data to localStorage
  useEffect(() => {
    SaveToLocalStorage("TotalProjects", TotalProjects);
  }, [TotalProjects]);

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
      alert("Maximum limit reached ! Save current projects to add more ");
      return;
    }
    setTotalProjects([...TotalProjects, form]);
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

    await fetch("/api/aboutProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TotalProjects),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success) {
          router.push("portfolio/" + data.user.username);
        }
      });
  };
  if (status === "loading") {
    return <LoadingPage />;
  }
  if (status === "unauthenticated") {
    return <LoadingPage />;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {TotalProjects.map((itemForm, key) => {
          return (
            <section
              key={key}
              className="bg-white p-1 xs:p-8 min-h-screen pt-32 pb-12  "
            >
              <div className="max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
                <h2 className="sm:text-xl text-[12px] font-bold mb-6 text-black">
                  Project {key + 1}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Title (Recommended 2-3 words)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="h-[50px] rounded-[5px] text-lg xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-medium"
                      value={itemForm.title}
                      onChange={e => {
                        handleChange(e, key);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                    >
                      Description (Recommended 15-25 words)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                      value={itemForm.description}
                      onChange={e => {
                        handleChange(e, key);
                      }}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="category"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Category
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        id="category"
                        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                        required
                        value={itemForm.category}
                        onChange={e => {
                          handleChange(e, key);
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {categories.map((cat, key) => {
                          return (
                            <option key={key} value={cat}>
                              {cat}{" "}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="subcategory"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Subcategory
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subcategory"
                        id="subcategory"
                        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                        value={itemForm.subcategory}
                        disabled={!itemForm.category}
                        required
                        onChange={e => {
                          handleChange(e, key);
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>

                        {itemForm.category.length > 1 &&
                          subcategoryMap[itemForm.category].map((ele, key) => {
                            return (
                              <option key={key} value={ele}>
                                {ele}{" "}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="thumbnail"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Thumbnail Url (Recommended)
                      </label>
                      <input
                        type="url"
                        id="thumbnail"
                        name="thumbnail"
                        className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                        value={itemForm.thumbnail}
                        onChange={e => {
                          handleChange(e, key);
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="link"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        id="link"
                        name="link"
                        className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                        value={itemForm.link}
                        onChange={e => {
                          handleChange(e, key);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="language"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Tech Stack (seperated by commas)
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap items-center border rounded-md xs:p-2 bg-white pl-2">
                        {itemForm.techStack.length > 0 &&
                          itemForm.techStack.map((ele, tagKey) => {
                            return (
                              <span
                                className="bg-[#D9F99D] text-[#4D7C0F] px-1 py-0 xs:px-2 xs:py-1 rounded m-1 text-xs xs:text-sm flex items-center"
                                key={tagKey}
                              >
                                {ele}
                                <button
                                  type="button"
                                  className="ml-1 text-[#4D7C0F] focus:outline-none cursor-pointer"
                                  onClick={e => {
                                    removeTag(e, key, tagKey);
                                  }}
                                >
                                  {" "}
                                  ×{" "}
                                </button>
                              </span>
                            );
                          })}
                        <input
                          type="text"
                          className=" h-[50px] rounded-[5px]  text-black font-light text-sm flex-grow outline-none py-2 w-2/3   xs:ml-2"
                          name="tag"
                          value={itemForm.tag}
                          onChange={e => {
                            handleChange(e, key);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex  gap-2.5 justify-end">
                  {key == TotalProjects.length - 1 && (
                    <>
                      <button
                        onClick={e => {
                          handleAdd(e, key);
                        }}
                        type="button"
                        className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]   gap-[10px] text-white px-1.5 cursor-pointer"
                      >
                        Add Project
                      </button>
                      <button
                        type="submit"
                        className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]  gap-[10px] text-white px-1.5 cursor-pointer"
                      >
                        Save
                      </button>
                      {ProjectsAlreadyPresent && (
                        <button
                          type="button"
                          className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]  gap-[10px] text-white px-1.5 cursor-pointer"
                          onClick={() => {
                            if (TotalProjects.length) {
                              const SHOW_PORTFOLIO = confirm(
                                "Are you sure you want to continue without saving current projects"
                              );
                              SHOW_PORTFOLIO &&
                                router.push(
                                  "portfolio/" + session.user.username
                                );
                            }
                          }}
                        >
                          Show Portfolio
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </form>
    </>
  );
};

export default Dashboard;
