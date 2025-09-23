"use client";
import React, { useState, useEffect } from "react";
import categories_subCat from "./categories_subCat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingPage from "../Loading/LoadingPage";
import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper";
import useProjects from "@/hooks/use-projects";
import { TrashIcon } from "@heroicons/react/24/solid";
const Dashboard = ({ updateInfo }) => {
  const { data: session, status } = useSession(); 
  
  
  const {
    categories,
    subcategoryMap,
    TotalProjects, 
    ProjectsAlreadyPresent, 
    updateInfoValue,
    handleChange,
    removeTag,
    handleAdd,
    handleSubmit,
    handleDelete,
  } = useProjects(updateInfo );

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
                <div className="flex w-full   justify-between items-center mb-6">
                  <h2 className="sm:text-xl text-[12px] font-bold  text-black  ">
                  Project {key + 1}
                </h2> 
             
                 <TrashIcon className="size-5 hover:cursor-pointer" onClick={()=>{handleDelete(key)}} />
             
                </div>
             

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
                      {!updateInfoValue && <button
                        onClick={e => {
                          handleAdd(e, key);
                        }}
                        type="button"
                        className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]   gap-[10px] text-white px-1.5 cursor-pointer"
                      >
                        Add Project
                      </button>}
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
