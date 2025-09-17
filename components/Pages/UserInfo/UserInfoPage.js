"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingPage from "../Loading/LoadingPage";
import ProfileSection from "./ProfileSection";
import PersonalSection from "./PersonalSection";
import ProfessionalSection from "./ProfessionalSection";
import AcademicSection from "./AcademicSection";
import ContactSection from "./ContactSection";
import { fetchFunction, UnderDevelopmentFeature } from "@/utlis";
import {   useUserInfo } from "@/hooks/use-user-info";

export default function UserInfoPage({ updateInfo }) {
  const router = useRouter();
  const { data: session, status } = useSession();
   const {
    form,
    setForm,
    teckStack,
    setTeckStack,
    certificationStack,
    setCertificationStack,
    handleChange,
    handleSubmit,
  } = useUserInfo(updateInfo, session, router ,status);

  if (status === "loading") {
    return <LoadingPage customClass={"h-screen"} />;
  }
  if (status === "unauthenticated") {
    // used when the user is unauthorized from starting and browser do not read further code which eventually end up to error
    return <LoadingPage />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="pb-4  my-36 w-auto    px-6    ">
        <div className=" flex flex-col     ">
          <ProfileSection
            form={form}
            handleChange={handleChange}
            session={session}
            UnderDevelopmentFeature={UnderDevelopmentFeature}
          />
          <PersonalSection
            form={form}
            handleChange={handleChange}
            session={session}
          />
          <ProfessionalSection
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            teckStack={teckStack}
            setTeckStack={setTeckStack}
            certificationStack={certificationStack}
            setCertificationStack={setCertificationStack}
          />

          <AcademicSection form={form} handleChange={handleChange} />

          <ContactSection form={form} handleChange={handleChange} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
