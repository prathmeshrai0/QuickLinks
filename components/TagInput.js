"use client";
import React, { useEffect, useState } from "react";

const TagInput = props => {
  const [tag, settag] = useState("");

  const handleChange = e => {
    settag(e.target.value);
  };
  useEffect(() => {
    if (tag.endsWith(",") && tag.length > 1) {
      let newTag = tag.slice(0, -1);

      settag("");
      props.setarrayList([...props.arrayList, newTag]);
    } else if (tag.endsWith(",") && tag.length < 2) {
      alert("You need to add a tag ");
    }
  }, [tag , props.arrayList, props.setarrayList]);

  const removeTag = (e, tagKey) => {
    props.arrayList.splice(tagKey, 1);
    props.setarrayList([...props.arrayList]);
  };
  return (
    
    <div className={`${props.customCssParent}`}>
      <label
        htmlFor="language"
        className="text-xs xs:text-sm font-medium text-gray-700 mb-1"
      >
        {props.name} (seperated by commas)
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
      <div className={`flex flex-wrap items-center     rounded-md   bg-white pl-2 ${props.customCss || ''} `}>
        {props.arrayList.length > 0 &&
          props.arrayList.map((ele, tagKey) => {
            return (
              <span
                className="bg-[#D9F99D] text-[#4D7C0F] px-1 py-0 xs:px-2 xs:py-1 rounded m-1 text-xs xs:text-sm flex items-center"
                key={tagKey}
              >
                {ele}
                <button
                  type="button"
                  className="ml-1 text-[#4D7C0F] focus:outline-none cursor-pointer"
                  onClick={e => {
                    removeTag(e, tagKey);
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
          className="      rounded-[5px]  text-black font-light text-sm flex-grow outline-none     "
          name="tag"
          value={tag}
          onChange={e => {
            handleChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default TagInput;
