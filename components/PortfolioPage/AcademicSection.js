import React from 'react'

const AcademicSection = ({UserDetails}) => {
  return (
    <section className="max-w-5xl mx-auto mt-10    ">
          <h2 className="text-2xl font-semibold mb-4">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {
              UserDetails.tenthMarks && (
                <div>
                  <span className="font-medium">10th Marks:</span> {UserDetails.tenthMarks}
                </div>
              )
            }

            {
              UserDetails.twelfthMarks && (
                <div>
                  <span className="font-medium">12th Marks:</span> {UserDetails.twelfthMarks}
                </div>
              )
            }

            {
              UserDetails.schoolName && (
                <div>
                  <span className="font-medium">School Name:</span> {UserDetails.schoolName}
                </div>
              )
            }

            {
              UserDetails.collegeName && (
                <div>
                  <span className="font-medium">College Name:</span> {UserDetails.collegeName}
                </div>
              )
            }

            {
              UserDetails.graduationCourse && (
                <div>
                  <span className="font-medium">Graduation Course:</span> {UserDetails.graduationCourse}
                </div>
              )
            }

            {
              UserDetails.graduationCgpa && (
                <div>
                  <span className="font-medium">Graduation CGPA:</span> {UserDetails.graduationCgpa}
                </div>
              )
            }

            {
              UserDetails.postgrad && (
                <div>
                  <span className="font-medium">Postgrad:</span> {UserDetails.postgrad}
                </div>
              )
            }

            {
              UserDetails.postgradCgpa && (
                <div>
                  <span className="font-medium">Postgrad CGPA:</span> {UserDetails.postgradCgpa}
                </div>
              )
            }
            {
              UserDetails.postgradSpecialization && (
                <div>
                  <span className="font-medium">Postgrad Specialization:</span> {UserDetails.postgradSpecialization}
                </div>
              )
            }

            {
              UserDetails.phd && (
                <div>
                  <span className="font-medium">Ph.D. :</span> {UserDetails.phd}
                </div>
              )
            }

            {
              UserDetails.phdSpecialization && (
                <div>
                  <span className="font-medium">Ph.D. Specialization:</span> {UserDetails.phdSpecialization}
                </div>
              )
            }

          </div>
        </section>
  )
}

export default AcademicSection