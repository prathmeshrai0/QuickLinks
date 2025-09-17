"use client";
import { useState, useEffect } from "react";

import { fetchFunction, RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis";
import { useSaveAndRetrive } from ".";

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
    const [certificationStack, setCertificationStack] = useState({
        title: "",
        link: "",
    });
    const [form, setForm] = useState({ ...defaultForm });
    // for manipulating skills array
    const [teckStack, setTeckStack] = useState([]);

    useEffect(() => {
        setForm({ ...form, ["skills"]: teckStack });
    }, [teckStack]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (status === "authenticated") {
            if (session.user.image) {
                setForm({ ...form, ["profilePic"]: session.user.image });
            }
        }
    }, [status, router]);

    const handleChange = e => {
        const element = e.target.name;
        const value = e.target.value;

        setForm({ ...form, [element]: value });
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
                if (updateInfo) {
                    router.push("update-info");
                } else {
                    router.push("project");
                }
            } else {
                alert(data.message);
            }
        });
    };

    // // used for handling updates
    useEffect(() => {
        if (updateInfo) {
            fetchFunction("api/user").then(data => {

                const RETRIVED_DATA = RetriveFromLocalStorage('user-info');
               
                setForm({ ...data.user, ...(RETRIVED_DATA ?? {}) });
                
                const merged = Array.from(new Set([...data.user.skills ,...Array.from(RETRIVED_DATA?.skills)]));
                setTeckStack(merged)
                 

            });
        }
    }, []);

    useSaveAndRetrive('user-info', form, setForm);

    return {
        form,
        setForm,
        teckStack,
        setTeckStack,
        certificationStack,
        setCertificationStack,
        handleChange,
        handleSubmit,
    };

}
