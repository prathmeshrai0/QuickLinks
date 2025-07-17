import Image from "next/image";
 
import landingSections from "@/components/landingPage/export";
export default function Home() {
  

  return (
    <>
      <main>
        < landingSections.intro />
        < landingSections.customize />
      </main>

 

    </>
  );
}
