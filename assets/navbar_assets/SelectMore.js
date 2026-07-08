import { UnderDevelopmentFeature } from "@/utlis";
import { useRouter } from "next/navigation";
import React from "react";

const SelectMore = props => {
  const router = useRouter();
  const handleSelect = e => {
    const option = e.target.value;

    if (option === "Theme") {
      UnderDevelopmentFeature();
    } else if (option === "About Us") {
      router.push("/about-us");
    } else if (option === "Upcoming Updates") {
      router.push("/upcoming-updates");
    } else if (option === "Report Issue") {
      router.push("/report-issue");
    }
  };
  return (
    <select
      onChange={handleSelect}
      defaultValue=""
      className={`${props.selectclassName}`}
    >
      <option value="" className={props.optionclassName} disabled>
        More
      </option>
      {props.option.map((ele, key) => {
        return (
          <option className={props.optionclassName} key={key} value={ele}>
            {ele}{" "}
          </option>
        );
      })}
    </select>
  );
};

export default SelectMore;
