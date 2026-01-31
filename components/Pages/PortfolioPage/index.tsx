"use client";
import React, { useEffect, useState } from "react";
import LoadingPage from "../Loading/LoadingPage";
import { useRouter } from "next/navigation";
import Footer from "../../Footer";
import Link from "next/link";
import {
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import HeaderSection from "./sections/HeaderSection";
import AcademicSection from "./sections/AcademicSection";
import PersonalSection from "./sections/PersonalSection";
import ProjectSection from "./sections/ProjectSection";
import ProfessionalSection from "./sections/ProfessionalSection";
import ContactSection from "./sections/ContactSection";
const PortfolioPage = props => {
  const router = useRouter();

  const UserDetails = props.UserDetails;

  const allProjects = [...UserDetails.allProjects];
  const certificates = [...UserDetails.certificates];
  const skills = [...UserDetails.skills];

  return (
    <>
      <div className="min-h-screen bg-gray-100      text-gray-900 font-sans text-sm sm:text-base">
        <HeaderSection UserDetails={UserDetails} />




        <div className=" px-7 flex flex-col      h-full     sm:gap-8 sm:pt-8 gap-4 pt-4   ">
          <PersonalSection UserDetails={UserDetails} />

          <ProfessionalSection UserDetails={UserDetails} certificates={certificates} skills={skills} />
          <AcademicSection UserDetails={UserDetails} />


          <ProjectSection UserDetails={UserDetails} allProjects={allProjects} />
          <ContactSection UserDetails={UserDetails} />
        </div>
        <Footer className={"max-w-screen mx-auto"} />

      </div>
    </>
  );
};

export default PortfolioPage;
