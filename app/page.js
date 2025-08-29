import Image from "next/image";
import landingSections from "@/components/Pages/landingPage/export";
export default function Home() {
  const { intro: Intro, customize: Customize } = landingSections; 

  return (
    <>
      <main>
        <Intro />
        {/* <Customize /> */}
      </main>



    </>
  );
}
