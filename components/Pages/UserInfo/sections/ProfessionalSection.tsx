import React, { useEffect, useState } from "react";
import TagInput from "@/components/TagInput";
import { isValidURL } from "@/utlis/helper";
import { Field, FieldError } from "@/components/ui/field";
import { useFieldArray } from "react-hook-form";

const ProfessionalSection = ({
  register,
  errors,
  control,
  formFieldsValue,
}: {
   
  register: any;
  errors: any;
  control: any;
  formFieldsValue: any;
 
}) => {
  const [certificatesCount, setCertificatesCount] = useState(0);
  const certificatesFA = useFieldArray({
    control,
    name: "certificates",
  });
  const skillsFA = useFieldArray({
    control,
    name: "skills",
  });
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profession Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Fill in your Profession background details below.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8   sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-900"
          >
            Profession / Occupation / Career / Job Title{" "}
            <span className="text-red-500">*</span>
            {errors.profession && (
              <FieldError>{errors.profession.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="profession"
              id="profession"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("profession")}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="language"
            className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
          >
            Enter your skills (Atleast add one){" "}
            <button
              className="text-black font-bold hover:underline hover:cursor-pointer "
              type="button"
              onClick={() => {
                skillsFA.append("");
              }}
            >
              Click me to add
            </button>
          </label>
          <div className="   flex flex-wrap items-center      pl-2 rounded-md    px-3 py-1.5  sm:text-sm  min-h-9">
            {errors.skills && <FieldError>{errors.skills.message}</FieldError>}
            {skillsFA.fields.map((field, index) => {
              return (
                <span
                  key={field.id}
                  className="bg-[#D9F99D] text-[#4D7C0F] px-1 py-0 xs:px-2 xs:py-1 rounded m-1 text-xs xs:text-sm flex items-center"
                >
                  <input
                    type="text"
                    className="      rounded-[5px]  text-black font-light text-sm flex-grow outline-none     "
                    {...register(`skills.${index}`)}
                  />
                  <button
                    type="button"
                    className="ml-1 text-[#4D7C0F] focus:outline-none cursor-pointer"
                    onClick={() => {
                      skillsFA.remove(index);
                    }}
                  >
                    X
                  </button>
                </span>
              );
            })}
          </div>
        </div>
        
      </div>

      <p className="text-xs xs:text-sm font-medium text-gray-700 mb-1 pt-12 flex gap-5">
        Fill in your Certification Details (if any){" "}
        <button
          className="text-black font-bold hover:underline hover:cursor-pointer "
          type="button"
          onClick={() => {
            certificatesFA.prepend({
              title: "",
              link: "",
            });
          }}
        >
          ADD CERTIFICATE
        </button>
      </p>
      {certificatesFA.fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="mt-10 grid grid-cols-1 gap-x-6 sm:gap-y-8 gap-y-4 sm:grid-cols-6 "
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="certificates"
                className="block text-sm font-medium text-gray-900"
              >
                Certification Title{" "}
                {errors.certificates?.[index]?.title && (
                  <FieldError>
                    {errors.certificates?.[index]?.title.message}
                  </FieldError>
                )}
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  name="certificates"
                  data-key="title"
                  id="certificates"
                  autoComplete="off"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  {...register(`certificates.${index}.title`)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="certificates"
                className="block text-sm font-medium text-gray-900"
              >
                Certification Link{" "}
                {errors.certificates?.[index]?.link && (
                  <FieldError>
                    {errors.certificates?.[index]?.link?.message}
                  </FieldError>
                )}
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  name="certificatesLink"
                  data-key="link"
                  id="certificates"
                  autoComplete="off"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  {...register(`certificates.${index}.link`)}
                />
              </div>
            </div>
            <div className="   block text-sm font-medium text-gray-900        sm:col-span-2  ">
              <label
                htmlFor="certificates"
                className="block text-sm font-medium text-gray-900   "
              >
                Operations
              </label>
              <button
                type="button"
                className=" mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm hover:cursor-pointer "
                onClick={() => {
                  certificatesFA.remove(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfessionalSection;
