import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseQPick from "@/components/home/WhyChooseQPick";
import TravelBlogs from "@/pageComponents/homePage/TravelBlogs";

export default function Home() {
  return (
    <>
      <main>
      <Hero />
      <About />
      <PopularDestinations />
      <WhyChooseQPick />
      <TravelBlogs />
      </main>
    </>
  );
}
