import React from 'react'

const AcademicSection = ({
  form,
  handleChange,
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
            10th Percentage
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
              value={form.tenthMarks }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="twelfth-marks"
            className="block text-sm font-medium text-gray-900"
          >
            12th Percentage
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
              value={form.twelfthMarks}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="school-name"
            className="block text-sm font-medium text-gray-900"
          >
            School Name
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="schoolName"
              id="school-name"
              autoComplete="organization"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.schoolName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="college-name"
            className="block text-sm font-medium text-gray-900"
          >
            College / University Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="collegeName"
              id="college-name"
              autoComplete="organization"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.collegeName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="graduation-course"
            className="block text-sm font-medium text-gray-900"
          >
            Graduation Course
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="graduationCourse"
              id="graduation-course"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.graduationCourse}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="graduation-cgpa"
            className="block text-sm font-medium text-gray-900"
          >
            Graduation  %
          </label>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="graduationCgpa"
              id="graduation-cgpa"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.graduationCgpa}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postgrad"
            className="block text-sm font-medium text-gray-900"
          >
            Post-Graduation Course (Optional)
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postgrad"
              id="postgrad"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.postgrad}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postgrad-cgpa"
            className="block text-sm font-medium text-gray-900"
          >
            Post-Graduation  %
          </label>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="postgradCgpa"
              id="postgrad-cgpa"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.postgradCgpa}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
           <label
            htmlFor="postgradSpecialization"
            className="block text-sm font-medium text-gray-900"
          >
            Post-Graduation - Specialization / Topic
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postgradSpecialization"
              id="postgradSpecialization"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.postgradSpecialization}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="sm:col-span-3">
          <label
            htmlFor="phd"
            className="block text-sm font-medium text-gray-900"
          >
            Ph.D. Field (Optional)
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="phd"
              id="phd"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.phd}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phdSpecialization"
            className="block text-sm font-medium text-gray-900"
          >
           Ph.D. - Specialization / Topic
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="phdSpecialization"
              id="phdSpecialization"
              autoComplete="off"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              value={form.phdSpecialization}
              onChange={handleChange}
            />
          </div>
        </div>

         
      </div>
    </div>
  )
}

export default AcademicSection