import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="landing-page-modern">
      <AnimatedBackground variant="light" />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}
