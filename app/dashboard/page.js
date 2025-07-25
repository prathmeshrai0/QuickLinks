"use client";
import React, { useEffect, useRef, useState } from "react";
import categories_subCat from "./categories_subCat";
const userDashboard = () => {

    const categories = categories_subCat.categories;
    const subcategoryMap = categories_subCat.subcategoryMap;
    const [form, setform] = useState({ title: "", tag: "", tags: [] });
    const category = useRef();
    const [selectedCategory, setselectedCategory] = useState("");

    const handleChange = e => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if (form.tag.endsWith(",") && form.tag.length > 1) {
            let newTag = form.tag.slice(0, -1);

            setform(prevFrom => ({
                ...form,
                ["tags"]: [...prevFrom.tags, newTag],
                ["tag"]: "",
            }));
        } else if (form.tag.endsWith(",") && form.tag.length < 2) {
            alert("You need to add a tag ");
        }
    }, [form.tag]);

    const removeTag = key => {
        let newTags = [...form.tags];
        newTags.splice(key, 1);
        setform({ ...form, tags: newTags });
    };
    const handleAdd = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <section className="bg-white p-1 xs:p-8 min-h-screen pt-44">
                <div className="max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
                    <h2 className="sm:text-xl text-[12px] font-bold mb-6 text-black">
                        Title
                    </h2>
                    <form>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                >
                                    Project Title{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        color="#9CA3AF"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-circle-alert inline-block"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="h-[50px] rounded-[5px] text-lg xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-medium"
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="title"
                                    className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        color="#9CA3AF"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-circle-alert inline-block"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                                    value=""
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Category
                                    </label>
                                    <select
                                        ref={category}
                                        name="category"
                                        id="category"
                                        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                                        defaultValue=""
                                        onChange={e => setselectedCategory(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {categories.map((cat, key) => {
                                            return (
                                                <option key={key} value={cat}>
                                                    {cat}{" "}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="subcategory"
                                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Subcategory
                                    </label>
                                    <select
                                        name="subcategory"
                                        id="subcategory"
                                        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2 text-black"
                                        defaultValue=""
                                        disabled={!selectedCategory}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>

                                        {selectedCategory.length > 1 &&
                                            subcategoryMap[selectedCategory].map((ele, key) => {
                                                return (
                                                    <option key={key} value={ele}>
                                                        {ele}{" "}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Thumbnail (Recommended)
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="h-[50px] rounded-[5px] text-sm xs:text-sm border border-[#D1D5DB] w-full px-2 text-black font-light"
                                        value=""
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="language"
                                        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Tech Stack (seperated by commas)
                                    </label>
                                    <div className="flex flex-wrap items-center border rounded-md xs:p-2 bg-white pl-2">
                                        {form.tags.length > 0 &&
                                            form.tags.map((ele, key) => {
                                                return (
                                                    <span
                                                        className="bg-[#D9F99D] text-[#4D7C0F] px-1 py-0 xs:px-2 xs:py-1 rounded m-1 text-xs xs:text-sm flex items-center"
                                                        key={key}
                                                    >
                                                        {ele}
                                                        <button
                                                            type="button"
                                                            className="ml-1 text-[#4D7C0F] focus:outline-none cursor-pointer"
                                                            onClick={() => {
                                                                removeTag(key);
                                                            }}
                                                        >
                                                            {" "}
                                                            ×{" "}
                                                        </button>
                                                    </span>
                                                );
                                            })}
                                        <input
                                            type="text"
                                            className=" h-[50px] rounded-[5px]  text-black font-light text-sm flex-grow outline-none py-2 w-2/3   xs:ml-2"
                                            name="tag"
                                            value={form.tag}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 flex  gap-2.5 justify-end">
                            <button
                                onClick={handleAdd}
                                type="submit"
                                className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]   gap-[10px] text-white px-1.5 cursor-pointer"
                            >
                                Add Project
                            </button>
                            <button
                                type="submit"
                                className="sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px]  gap-[10px] text-white px-1.5 cursor-pointer"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default userDashboard;
