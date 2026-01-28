"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingPage from "../Loading/LoadingPage";
import ProfileSection from "./sections/ProfileSection";
import PersonalSection from "./sections/PersonalSection";
import ProfessionalSection from "./sections/ProfessionalSection";
import AcademicSection from "./sections/AcademicSection";
import ContactSection from "./sections/ContactSection";
import { UnderDevelopmentFeature } from "@/utlis";
import { useUserInfo } from "./hook/use-user-info";

export default function UserInfoPage({ updateInfo }: { updateInfo: boolean }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    form,
    setform,
    skills,
    setskills,
    certificationStack,
    setcertificationStack,
    handleChange,
    handleSubmit,
    register,
    formFieldsValue,
    errors,
    control,
    setError,
    setValue,
    Submit,
    trigger,
    clearErrors,
    watch,
  } = useUserInfo(updateInfo, session, router, status);

  if (status === "loading") return <LoadingPage className={"h-screen"} />;
  if (status === "unauthenticated") return <LoadingPage />;

  return (
    <form onSubmit={handleSubmit(Submit)} className="pb-4 my-36 w-auto px-6">
      <div className="flex flex-col">
        <ProfileSection
          form={form}
          handleChange={handleChange}
          session={session}
          UnderDevelopmentFeature={UnderDevelopmentFeature}
          register={register}
          errors={errors}
          formFieldsValue={formFieldsValue}
        />

        <PersonalSection
          form={form}
          handleChange={handleChange}
          session={session}
          register={register}
          errors={errors}
          formFieldsValue={formFieldsValue}
        />

        <ProfessionalSection
         
         
          register={register}
          errors={errors}
          control={control}
          formFieldsValue={formFieldsValue}
           
        />

        <AcademicSection
          form={form}
          handleChange={handleChange}
          register={register}
          errors={errors}
        />

        <ContactSection
          form={form}
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
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
  );
}
