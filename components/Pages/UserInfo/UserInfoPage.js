"use client";
import { useSession } from "next-auth/react";
import { unauthorized, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingPage from "../Loading/LoadingPage";
import ProfileSection from "./ProfileSection";
import PersonalSection from "./PersonalSection";
import ProfessionalSection from "./ProfessionalSection";
import AcademicSection from "./AcademicSection";
import ContactSection from "./ContactSection";
import { UnderDevelopmentFeature } from "@/utlis/utilities";

export default function UserInfoPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [certificationStack, setcertificationStack] = useState({
    title: "",
    link: "",
  });
  const [form, setform] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    country: "",
    gender: "",
    city: "",
    profilePic: "",
    about: "",

    // Professional Info
    profession: "",
    skills: [],

    // Academic Info
    tenthMarks: "",
    twelfthMarks: "",
    schoolName: "",
    collegeName: "",
    graduationCourse: "",
    graduationCgpa: "",
    postgrad: "",
    postgradCgpa: "",
    postgradSpecialization: "",
    phd: "",
    phdSpecialization: "",

    // Projects and Certification link
    certificates: [],

    // Contact Info
    phoneNo: "",
    linkedIn: "",
    github: "",
  });


  // for manipulating skills array
  const [teckStack, setteckStack] = useState([]);
  useEffect(() => {
    setform({ ...form, ["skills"]: teckStack });
  }, [teckStack]);




  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === 'authenticated') {
      if (session.user.image) {
        setform({ ...form, ['profilePic']: session.user.image })
      }
    }
  }, [status, router]);

  const handleChange = e => {
    const element = e.target.name;
    const value = e.target.value;

    setform({ ...form, [element]: value });
  };
  const convertInputTypeNumToNumber = () => {
    const { tenthMarks, twelfthMarks, graduationCgpa, postgradCgpa } = form;
    return { ...form, tenthMarks: Number(tenthMarks), twelfthMarks: Number(twelfthMarks), graduationCgpa: Number(graduationCgpa), postgradCgpa: Number(postgradCgpa) }
  }
  const isTechStackEmpty = () => { 
    
    if (form.skills.length < 1) {
      return true;
    }
    return false;
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const payLoad = convertInputTypeNumToNumber(); 
    
    if (isTechStackEmpty()) { 
      
      alert("You need to add minimun one skill ")
      return false;
    } 
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    })
      .then(res => {
        return res.json(); // you need to return here because you are doing within {}
      })
      .then(data => {
        if (data.success) {
          router.push("dashboard");
        }
        else {

          if (data.status === 401) {
            alert(data.message)
          } else if (data.status === 409) {
            alert(data.message)
          }
        }
      });
  };


   

  if (status === "loading") {
    return <LoadingPage customClass={'h-screen'} /> ;
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
            setform={setform}
            handleChange={handleChange}
            teckStack={teckStack}
            setteckStack={setteckStack}
            certificationStack={certificationStack}
            setcertificationStack={setcertificationStack}
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
