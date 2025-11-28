import Banner from "@/Component/Banner";
import Section1 from "@/Component/Section1";
import Section2 from "@/Component/Section2";
import Section3 from "@/Component/Section3";
import Section4 from "@/Component/Section4";
import Image from "next/image";

export default function Home() {
  return (
    <div className="    bg-zinc-50 font-sans dark:bg-black">
      <Banner></Banner>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      
    </div>
  );
}
