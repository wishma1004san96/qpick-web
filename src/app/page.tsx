import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[104px] sm:pt-[112px] lg:pt-[118px]">
      <Hero />
      <About />
      </main>
    </>
  );
}