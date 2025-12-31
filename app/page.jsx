// app/page.jsx
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import Store from '../components/Store';
import Contact from '../components/Contact';


export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Blog />
      <Testimonials />
      <Store />
      <Contact />
    </>
  );
}
