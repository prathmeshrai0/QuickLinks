import { UnderDevelopmentFeature } from "@/utlis";
import { useRouter } from "next/navigation";
import React from "react";

const SelectMore = props => {
  const router = useRouter();
  const handleSelect = e => { 
    const option = e.target.value; 

    if(option === 'Theme'){
      UnderDevelopmentFeature()
    }
    else  if(option === 'About Us'){ 
      router.push('/about-us')
    }
    else  if(option === 'Upcoming Updates'){ 
      router.push('/upcoming-updates')
    }
    else  if(option === 'Report Issue'){ 
      
        router.push('/report-issue')
    }
  };
  return (
    <select
      onChange={handleSelect}
      defaultValue=""
      className="hover:bg-gray-400 lg:px-5 p-3 py-1.5 rounded-sm bg-gray-200  border-0"
      name="more"
      id=""
    >
      <option value="" className="bg-white" disabled>
        more
      </option>
      {props.option.map((ele, key) => {
        return (
          <option className="border-0 bg-white" key={key} value={ele}>
            {ele}{" "}
          </option>
        );
      })}
    </select>
 

  );
};

export default SelectMore;
