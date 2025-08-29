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
import HeaderSection from "./HeaderSection";
import AcademicSection from "./AcademicSection";
import PersonalSection from "./PersonalSection";
import ProjectSection from "./ProjectSection";
import ProfessionalSection from "./ProfessionalSection";
import ContactSection from "./ContactSection";
const PortfolioPage = props => {
  const router = useRouter();

  const UserDetails = props.UserDetails;

  const allProjects = [...UserDetails.allProjects];
  const certificates = [...UserDetails.certificates];
  const skills = [...UserDetails.skills];

  return (
    <>
      <div className="min-h-screen bg-gray-100     text-gray-900 font-sans">
        <HeaderSection UserDetails={UserDetails} />




        <PersonalSection UserDetails={UserDetails} />

        <ProfessionalSection UserDetails={UserDetails} certificates={certificates} skills={skills} />
        <AcademicSection UserDetails={UserDetails} />


        <ProjectSection UserDetails={UserDetails} allProjects={allProjects} />
        <ContactSection UserDetails={UserDetails} />

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
