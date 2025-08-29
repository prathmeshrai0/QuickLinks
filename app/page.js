import Image from "next/image";
import landingSections from "@/components/Pages/landingPage/export";
export default function Home() {
  const { Intro: Intro  } = landingSections; 

  return (
    <>
      <main>
        <Intro /> 
      </main>



    </>
  );
}
