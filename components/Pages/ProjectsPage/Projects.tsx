"use client";
import React, { useState, useEffect } from "react";
import categories_subCat from "./categories_subCat";
import { useSession } from "next-auth/react";
import LoadingPage from "../Loading/LoadingPage";
import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis/helper";
import useProjects from "@/components/Pages/ProjectsPage/hook/use-projects";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { FieldError } from "@/components/ui/field";
import { useForm, useFormContext } from "react-hook-form";
import { schema } from "./schema/projects-schema";
import zod, { string } from "zod";
import { FormProvider } from "react-hook-form";
const Dashboard = ({ updateInfo }: { updateInfo: boolean }) => {
  const { data: session, status } = useSession();

  const {
    categories,
    subcategoryMap, 
    ProjectsAlreadyPresent,
 
    Submit, 
    router,

    // RHF
    // register,
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
    useFormMethods,
  } = useProjects(updateInfo);
 const { register } = useFormContext();
  type FormType = zod.infer<typeof schema>;
  const TechStackComp = ({ projectIndex }: { projectIndex: number }) => {
    const { register } = useFormContext();

    const {
      fields: techStackFields,
      append: appendTechStack,
      remove: removeTechStack,
    } = useFieldArray({
      // control,
      name: `TotalProjects.${projectIndex}.techStack`,
    });
    // console.log(techStackFields);
    // console.log(projectDataValue.TotalProjects[projectIndex].techStack);



    return ( 
      <div className=" flex min-h-[50px] rounded-[5px]  text-black font-light text-sm flex-grow outline-none py-2 min-w-2/3   xs:ml-2 flex-wrap gap-0.5  ">
        {techStackFields.map((tag, tagIndex) => (
          <section key={tag.id} className="relative border h-min">
            {/* {errors.TotalProjects?.[projectIndex]?.techStack[tagIndex]?.tag && (
              <FieldError>
                {errors.TotalProjects?.[projectIndex]?.techStack[tagIndex]?.tag.message}
              </FieldError>
            )} */}
            <input
              type="text" 
              className=" bg-[#D9F99D]     rounded  font-medium flex items-center w-min h-min "
              {...register(
                `TotalProjects.${projectIndex}.techStack.${tagIndex}.tag`,
              )}
            />
            <button
              onClick={() => {
                removeTechStack(tagIndex);
              }}
              className="absolute right-0  top-1/2 -translate-y-1/2 "
            >
              <TrashIcon className="size-4 hover:cursor-pointer" />
            </button>
          </section>
        ))}
        <button
          type="button"
          onClick={() => { appendTechStack({ tag: "" }) }}
          className="flex items-center gap-1   h-min"
        >
          <svg
            className="size-5 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };
  // const methods = useForm();

  if (status === "loading") {
    return <LoadingPage />;
  }
  if (status === "unauthenticated") {
    return <LoadingPage />;
  }
  return (
    <>
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit(Submit)}
          className=" min-h-screen border   flex  flex-col 
        justify-end  "
        >
          {projectsArray.fields.map((field, index) => {
            return (
              <section
                key={field.id}
                className="bg-white p-1 xs:p-8 min-h-screen pt-32 pb-12   "
              >
                <div className="max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
                  <div className="flex w-full   justify-between items-center mb-6">
                    <h2 className="sm:text-xl text-[12px] font-bold  text-black  ">
                      Project {index + 1}
                    </h2>

                    <TrashIcon
                      className="size-5 hover:cursor-pointer"
                      onClick={() => {
                        projectsArray.remove(index);
                      }}
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Project Title (Recommended 2-3 words){" "}
                        {errors.TotalProjects?.[index]?.title && (
                          <FieldError>
                            {errors.TotalProjects?.[index]?.title.message}
                          </FieldError>
                        )}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="h-[50px] rounded-[5px] text-lg xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-medium"
                        {...register(`TotalProjects.${index}.title`)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                      >
                        Description (Recommended 15-25 words){" "}
                        {errors.TotalProjects?.[index]?.description && (
                          <FieldError>
                            {errors.TotalProjects?.[index]?.description.message}
                          </FieldError>
                        )}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                        {...register(`TotalProjects.${index}.description`)}
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
                          {errors.TotalProjects?.[index]?.category && (
                            <FieldError>
                              {errors.TotalProjects?.[index]?.category.message}
                            </FieldError>
                          )}
                        </label>
                        <select
                          name="category"
                          id="category"
                          className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                          {...register(`TotalProjects.${index}.category`)}
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
                          {errors.TotalProjects?.[index]?.subcategory && (
                            <FieldError>
                              {
                                errors.TotalProjects?.[index]?.subcategory
                                  .message
                              }
                            </FieldError>
                          )}
                        </label>
                        <select
                          name="subcategory"
                          id="subcategory"
                          className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                          {...register(`TotalProjects.${index}.subcategory`)}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {subcategoryMap[
                            projectDataValue.TotalProjects[index].category
                          ].map((ele, key) => {
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
                          {errors.TotalProjects?.[index]?.thumbnail && (
                            <FieldError>
                              {errors.TotalProjects?.[index]?.thumbnail.message}
                            </FieldError>
                          )}
                        </label>
                        <input
                          type="url"
                          id="thumbnail"
                          name="thumbnail"
                          className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                          {...register(`TotalProjects.${index}.thumbnail`)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="link"
                          className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                        >
                          Link <span className="text-red-500">*</span>
                          {errors.TotalProjects?.[index]?.link && (
                            <FieldError>
                              {errors.TotalProjects?.[index]?.link.message}
                            </FieldError>
                          )}
                        </label>
                        <input
                          type="url"
                          id="link"
                          name="link"
                          className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                          {...register(`TotalProjects.${index}.link`)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="language"
                          className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                        >
                          Tech Stack (seperated by commas){" "}
                          <span className="text-red-500">*</span>
                          {errors.TotalProjects?.[index]?.techStack && (
                            <FieldError>
                              {errors.TotalProjects?.[index]?.techStack.message}
                            </FieldError>
                          )}
                        </label>
                        <div className="flex flex-wrap items-center border rounded-md xs:p-2 bg-white pl-2">
                          {/* <TechStackComp projectIndex={index} /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex  gap-2.5 justify-end"></div>
                </div>
              </section>
            );
          })}
          <div className="flex   justify-evenly mb-2 gap-1.5  ">
            <button
              onClick={() => {
                projectsArray.append({
                  title: "",
                  description: "",
                  category: "Web Development",
                  subcategory: "",
                  thumbnail: "",
                  link: "",
                  techStack: [],
                });
              }}
              type="button"
              className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]   gap-[10px] text-white px-1.5 cursor-pointer"
            >
              Add Project
            </button>
            <button
              type="submit"
              // onClick={() => {
              //   console.log("clicked");
              // }}
              className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]   gap-[10px] text-white px-1.5 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Dashboard;
