import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Mindset } from "./components/Mindset";
import { Featured } from "./components/Featured";
import { HowIThink } from "./components/HowIThink";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <About />
        <Mindset />
        <Featured />
        <HowIThink />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
