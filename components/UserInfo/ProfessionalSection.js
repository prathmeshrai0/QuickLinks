import React from "react";
import TagInput from "../TagInput";
import { isValidURL } from "@/utlis/utilities";

const ProfessionalSection = ({
    form,
    setform,
    teckStack,
    setteckStack,
    certificationStack,
    setcertificationStack,
}) => {
    const handleChange = e => {
        const element = e.target.name;
        const value = e.target.value;
        if (element === "certificates") {
            const dataKey = e.target.dataset.key;
            setcertificationStack({ ...certificationStack, [dataKey]: value });
        } else {
            setform({ ...form, [element]: value });
        }
    };
    
    const handleAddCertificate = () => {

        if (certificationStack.title.length > 0 && certificationStack.link.length > 0) {


            if (isValidURL(certificationStack.link)) {
                setform({ ...form, ['certificates']: [...form.certificates, certificationStack] })
                setcertificationStack({
                    title: "",
                    link: "",
                })
            }
            else {
                alert('Kindly enter valid URL')
            }
        }
        else {
            alert('You need to fill both fields')
        }
    }
    const handleDeleteCertificate = (key) => {

        // delete form.certificates[key];
        form.certificates.splice(key, 1);
        setform({ ...form })

    }
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profession Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill in your Profession background details below.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label
                        htmlFor="profession"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Profession / Occupation / Career / Job Title  <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="profession"
                            id="profession"
                            autoComplete="off"
                            required
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                            value={form.profession}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <TagInput
                    name={"TechStack"}
                    arrayList={teckStack}
                    setarrayList={setteckStack}
                    customCss="min-w-md   rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm  min-h-9  "
                />
            </div>

            <p className="mt-1 text-sm leading-6 text-gray-600 pt-12">
                Fill in your Certification Details (if any)
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-2">
                    <label
                        htmlFor="certificates"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Certification Title
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="certificates"
                            data-key="title"
                            id="certificates"
                            autoComplete="off"
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                            value={certificationStack.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="certificates"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Certification Link
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            name="certificates"
                            data-key="link"
                            id="certificates"
                            autoComplete="off"
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                            value={certificationStack.link}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="sm:col-span-1  block text-sm font-medium text-gray-900    relative  ">
                    <label
                        htmlFor="certificates"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Operations
                    </label>
                    <button type="button" className=" custom-button     max-h-1/2 absolute bottom-0 py-1.5 w-full   " onClick={handleAddCertificate}>
                        ADD
                    </button>
                </div>
            </div>
            {form.certificates.length > 0 && form.certificates.map((ele, key) => {


                return <div key={key} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  ">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="certificates"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Certification Title
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="certificates"
                                data-key="title"
                                id="certificates"
                                readOnly
                                autoComplete="off"
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                value={ele.title}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="certificates"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Certification Link
                        </label>
                        <div className="mt-2">
                            <input
                                type="url"
                                name="certificates"
                                data-key="link"
                                id="certificates"
                                autoComplete="off"
                                readOnly
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                value={ele.link}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-1  block text-sm font-medium text-gray-900   relative ">

                        <button type="button" onClick={() => {
                            handleDeleteCertificate(key)
                        }} className=" custom-button bg-gray-200   max-h-1/2 absolute bottom-0 py-1.5 w-full   ">
                            Delete
                        </button>
                    </div>
                </div>

            })}
        </div>
    );
};

export default ProfessionalSection;
