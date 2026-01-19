import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative z-0 bg-primary pb-10">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Experience />
      <TechStack />
    </div>
  );
}
