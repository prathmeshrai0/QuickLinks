"use client";
import React, { useEffect, useState } from "react";
import LoadingPage from "../Loading/LoadingPage";
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import Link from "next/link";
const PortfolioPage = props => {
  const router = useRouter();

  const UserDetails = props.UserDetails;
  const AllProjects = [
    ...UserDetails.AllProjects,

    {
      id: "68a7dc531ade331c63b97445",
      title: "test one ",
      description: "test ",
      category: "Cybersecurity",
      subcategory: "Incident Response",
      thumbnail: "test",
      techStack: ["tmkoc"],
      UserInfoId: "68a767535d8a8740c8aaca19",
    },
    {
      id: "68a7dc531ade331c63b97445",
      title: "test one ",
      description: "test ",
      category: "Cybersecurity",
      subcategory: "Incident Response",
      thumbnail: "test",
      techStack: ["tmkoc"],
      UserInfoId: "68a767535d8a8740c8aaca19",
    },
    {
      id: "68a7dc531ade331c63b97445",
      title: "test one ",
      description: "test ",
      category: "Cybersecurity",
      subcategory: "Incident Response",
      thumbnail: "test",
      techStack: ["tmkoc"],
      UserInfoId: "68a767535d8a8740c8aaca19",
    },
    {
      id: "68a7dc531ade331c63b97445",
      title: "test one ",
      description: "test ",
      category: "Cybersecurity",
      subcategory: "Incident Response",
      thumbnail: "test",
      techStack: ["tmkoc"],
      UserInfoId: "68a767535d8a8740c8aaca19",
    },
  ]; 
 

  return (
    <>
      <div className="min-h-screen bg-gray-100     text-gray-900 font-sans">
        {/* Header / Hero Section */}
        <header className="bg-white shadow-md py-10 px-6 md:px-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {UserDetails.firstName} {UserDetails.lastName}
              </h1>
              <p className="text-gray-600 text-lg">@{UserDetails.username}</p>
              <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${UserDetails.email}&su=Hello&body=Hi%20there!`}
                target="_blank"
                rel="noopener noreferrer" className="text-gray-500 mt-1">{UserDetails.email}</Link>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="max-w-5xl mx-auto mt-10 px-6 md:px-20">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700">
            {UserDetails.about || "No details provided."}
          </p>
        </section>

        {/* Personal Info */}
        <section className="max-w-5xl mx-auto mt-10 px-6 md:px-20">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-medium">First Name:</span>{" "}
              {UserDetails.firstName}
            </div>
            <div>
              <span className="font-medium">Last Name:</span>{" "}
              {UserDetails.lastName}
            </div>
            <div>
              <span className="font-medium">Country:</span>{" "}
              {UserDetails.country}
            </div>
            {UserDetails.city && <div>
              <span className="font-medium">City:</span> {UserDetails.city}
            </div>}
             
          </div>
        </section>

        {/* Academic Info */}
        <section className="max-w-5xl mx-auto mt-10 px-6 md:px-20  ">
          <h2 className="text-2xl font-semibold mb-4">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-medium">10th Marks:</span>{" "}
              {UserDetails.tenthMarks}
            </div>
            <div>
              <span className="font-medium">12th Marks:</span>{" "}
              {UserDetails.twelfthMarks}
            </div>
            <div>
              <span className="font-medium">School Name:</span>{" "}
              {UserDetails.schoolName}
            </div>
            <div>
              <span className="font-medium">College Name:</span>{" "}
              {UserDetails.collegeName}
            </div>
            <div>
              <span className="font-medium">Graduation Course:</span>{" "}
              {UserDetails.graduationCourse}
            </div>
            <div>
              <span className="font-medium">Graduation CGPA:</span>{" "}
              {UserDetails.graduationCgpa}
            </div>
            <div>
              <span className="font-medium">Postgrad:</span>{" "}
              {UserDetails.postgrad}
            </div>
            <div>
              <span className="font-medium">Postgrad CGPA:</span>{" "}
              {UserDetails.postgradCgpa}
            </div>
            <div>
              <span className="font-medium">PhD:</span> {UserDetails.phd}
            </div>
            <div>
              <span className="font-medium">Specialization:</span>{" "}
              {UserDetails.specialization}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mt-10 px-6 md:px-20 ">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            {/* All Projects   */}
            {AllProjects.map((ele, key) => {
              return (
                <div
                  key={key}
                  className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-72     hover:shadow-2xl transition-all duration-200   "
                >
                  <div className="m-2.5 overflow-hidden rounded-md h-40 flex justify-center items-center">
                    <img
                      className="w-full h-full object-cover"
                      // src="https://docs.material-tailwind.com/img/team-3.jpg"
                      src={ele.thumbnail || ""} 
                      alt="thumbnail"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="mb-1 text-xl font-semibold text-slate-800">
                      {ele.title}
                    </h4>
                    <p className="text-sm font-semibold text-slate-500 uppercase">
                      {ele.category} - {ele.subcategory}
                    </p>
                    <p className="text-base text-slate-600 mt-4 font-light ">
                      {ele.description}
                    </p>
                  </div>
                  <div className="flex justify-center p-6 pt-2 gap-7">
                    {ele.techStack.map((ele, key) => {
                      return (
                        <span
                          key={key}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          #{ele}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
