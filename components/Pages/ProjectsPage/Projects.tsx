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
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { schema } from "./schema/projects-schema";
import zod, { string } from "zod";
import { FormProvider } from "react-hook-form";
import TechStackComp from "./TechStackComp";

const Dashboard = ({ updateInfo }: { updateInfo: boolean }) => {
  const { data: session, status } = useSession();

  const {
    categories,
    subcategoryMap,

    Submit,
    router,

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

  } = useProjects(updateInfo);
  //  const { register } = useFormContext();
  type FormType = zod.infer<typeof schema>;

  // const methods = useForm();

  if (status === "loading") {
    return <LoadingPage />;
  }
  if (status === "unauthenticated") {
    return <LoadingPage />;
  }
  return (
    <>
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
                        {errors.TotalProjects?.[index]?.techStack?.root && (
                          <FieldError>
                            {errors.TotalProjects?.[index]?.techStack?.root?.message}
                          </FieldError>
                        )}
                      </label>
                      <div className="flex flex-wrap items-center border rounded-md xs:p-2 bg-white pl-2">
                        <TechStackComp projectIndex={index} control={control} register={register} errors={errors} />
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
          {
            !updateInfo && <button
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
          }
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
    </>
  );
};

export default Dashboard;
