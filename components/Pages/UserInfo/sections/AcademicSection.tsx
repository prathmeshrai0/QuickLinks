import { FieldError } from "@/components/ui/field";
import React from "react";

const AcademicSection = ({
  form,
  handleChange,
  register,
  errors,
}: {
  form: any;
  handleChange: any;
  register: any;
  errors: any;
}) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Academic Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Fill in your academic background details below.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="tenth-marks"
            className="block text-sm font-medium text-gray-900"
          >
            10th Percentage{errors.tenthMarks && (
              <FieldError>{errors.tenthMarks.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="tenthMarks"
              id="tenth-marks"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("tenthMarks")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="twelfth-marks"
            className="block text-sm font-medium text-gray-900"
          >
            12th Percentage{errors.twelfthMarks && (
              <FieldError>{errors.twelfthMarks.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="twelfthMarks"
              id="twelfth-marks"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("twelfthMarks")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="school-name"
            className="block text-sm font-medium text-gray-900"
          >
            School Name{errors.schoolName && (
              <FieldError>{errors.schoolName.message}</FieldError>
            )}
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="schoolName"
              id="school-name"
              autoComplete="organization"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("schoolName")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="college-name"
            className="block text-sm font-medium text-gray-900"
          >
            College / University Name{errors.collegeName && (
              <FieldError>{errors.collegeName.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="collegeName"
              id="college-name"
              autoComplete="organization"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("collegeName")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="graduation-course"
            className="block text-sm font-medium text-gray-900"
          >
            Graduation Course{errors.graduationCourse && (
              <FieldError>{errors.graduationCourse.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="graduationCourse"
              id="graduation-course"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("graduationCourse")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="graduation-cgpa"
            className="block text-sm font-medium text-gray-900"
          >
            Graduation %{errors.graduationMarks && (
              <FieldError>{errors.graduationMarks.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="graduationMarks"
              id="graduation-marks"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("graduationMarks")}
            />
          </div>
        </div> 

          <div className="sm:col-span-2">
            <label
              htmlFor="postgrad"
              className="block text-sm font-medium text-gray-900"
            >
              Post-Graduation Course (if any){errors.postgrad && (
                <FieldError>{errors.postgrad.message}</FieldError>
              )}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postgrad"
                id="postgrad"
                autoComplete="off"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                {...register("postgrad")}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postgrad-cgpa"
              className="block text-sm font-medium text-gray-900"
            >
              Post-Graduation %{errors.postgradMarks && (
                <FieldError>{errors.postgradMarks.message}</FieldError>
              )}
            </label>
            <div className="mt-2">
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                name="postgradMarks"
                id="postgrad-marks"
                autoComplete="off"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                {...register("postgradMarks")}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postgradSpecialization"
              className="block text-sm font-medium text-gray-900"
            >
              Post-Graduation - Specialization / Topic{errors.postgradSpecialization && (
                <FieldError>{errors.postgradSpecialization.message}</FieldError>
              )}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postgradSpecialization"
                id="postgradSpecialization"
                autoComplete="off"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm "
                {...register("postgradSpecialization")}
              />
            </div>
          </div>
        

        <div className="sm:col-span-3">
          <label
            htmlFor="phd"
            className="block text-sm font-medium text-gray-900"
          >
            Ph.D. Field (if any){errors.phd && (
              <FieldError>{errors.phd.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="phd"
              id="phd"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("phd")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phdSpecialization"
            className="block text-sm font-medium text-gray-900"
          >
            Ph.D. - Specialization / Topic{errors.phdSpecialization && (
              <FieldError>{errors.phdSpecialization.message}</FieldError>
            )}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="phdSpecialization"
              id="phdSpecialization"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              {...register("phdSpecialization")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicSection;
