import { FieldError } from "@/components/ui/field";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFieldArray } from "react-hook-form";

const TechStackComp = ({
  projectIndex,
  control,
  register,
  errors,
}: {
  projectIndex: number;
  control: any;
  register: any;
  errors: any;
}) => {
  // const { register } = useFormContext();

  const {
    fields: techStackFields,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control,
    name: `TotalProjects.${projectIndex}.techStack`,
  });
 
  return (
    <div className=" flex min-h-[50px] rounded-[5px]  text-black font-light text-sm flex-grow outline-none py-2 min-w-2/3   xs:ml-2 flex-wrap gap-2  ">
      {techStackFields.map((tag, tagIndex) => {
        if (errors.TotalProjects?.[projectIndex]?.techStack != undefined) {
          var errorExists =
            errors.TotalProjects?.[projectIndex]?.techStack[tagIndex]?.tag ??
            false; 
        }
        return (
          <section key={tag.id} className=" border h-min    ">
            {errorExists && (
              <FieldError>
                {
                  errors.TotalProjects?.[projectIndex]?.techStack[tagIndex]?.tag
                    .message
                }
              </FieldError>
            )}
            <div className="relative">
              <input
              type="text"
              className=" bg-[#D9F99D]     rounded  font-medium flex items-center w-min h-min "

              {...register(
                `TotalProjects.${projectIndex}.techStack.${tagIndex}.tag`,
              )}
            />
            <button
              onClick={() => {
                removeTechStack(tagIndex);
              }}
              className="absolute right-0  top-1/2 -translate-y-1/2   "
            >
              <TrashIcon className="size-4 hover:cursor-pointer    " />
            </button>
            </div>
          </section>
        );
      })}
      <button
        type="button"
        onClick={() => {
          appendTechStack({ tag: "" });
        }}
        className="flex items-center gap-1   h-min"
      >
        <svg
          className="size-5 text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default TechStackComp;
