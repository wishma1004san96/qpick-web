import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <About />
      </main>
    </>
  );
}