"use client";
import { useState, useEffect, useRef } from "react";

import {
  DeleteFromLocalStorage,
  fetchFunction,
  RetriveFromLocalStorage,
  SaveToLocalStorage,
} from "@/utlis";

const defaultForm = {
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
};

export function useUserInfo(updateInfo, session, router, status) {
  const [certificationStack, setcertificationStack] = useState({
    title: "",
    link: "",
  });
  const [form, setform] = useState({ ...defaultForm });
  // for manipulating skills array
  const [teckStack, setteckStack] = useState([]);
const LSKey = "user-info";

  useEffect(() => {
    // // used for handling updates
    const RETRIVED_DATA = RetriveFromLocalStorage(LSKey);
    if (updateInfo) {
      fetchFunction("api/user").then(data => {
        

        setform({ ...data.user, ...(RETRIVED_DATA ?? {}) });
        // make unique elements 
        const merged = Array.from(
          new Set([
            ...data.user.skills,
            ...Array.from(RETRIVED_DATA?.skills ?? []),
          ])
        );

        setteckStack(merged);
      });
    } else {
      if (RETRIVED_DATA) {
        setform(prev => ({
          ...prev, ...RETRIVED_DATA
        }));
        setteckStack(prev => [...RETRIVED_DATA.skills])
      }
    }
  }, []);
  useEffect(() => {

    SaveToLocalStorage(LSKey, form);
  }, [form]);

  useEffect(() => {


    setform(prev => ({ ...prev, ["skills"]: teckStack }));
  }, [teckStack]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      if (session.user.image) {

        setform(prev => ({ ...prev, ["profilePic"]: session.user.image }));
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
    return {
      ...form,
      tenthMarks: Number(tenthMarks),
      twelfthMarks: Number(twelfthMarks),
      graduationCgpa: Number(graduationCgpa),
      postgradCgpa: Number(postgradCgpa),
    };
  };

  const isTechStackEmpty = () => {
    if (form.skills.length < 1) {
      return true;
    }
    return false;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const payLoad = convertInputTypeNumToNumber();

    if (isTechStackEmpty()) {
      alert("You need to add minimun one skill ");
      return false;
    }

    fetchFunction("/api/user", payLoad, "PUT").then(data => {
      if (data.success) {
        DeleteFromLocalStorage(LSKey );
        if (updateInfo) {
          router.push("update-info");
        } else {
          router.push("project");
        }
      } else {
        console.log(data);
        
        alert(data.message);
      }
    });
  };
  return {
    form,
    setform,
    teckStack,
    setteckStack,
    certificationStack,
    setcertificationStack,

    handleChange,
    handleSubmit,
  };
}
