import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Process from "@/components/process"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Stats from "@/components/stats"
import Team from "@/components/team"
import Blog from "@/components/blog"
import Faq from "@/components/faq"
import Contact from "@/components/contact"
import Clients from "@/components/clients"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Clients />
      <Services />
      <About />
      <Process />
      <Technologies />
      <Projects />
      <Stats />
      <Testimonials />
      <Team />
      <Blog />
      <Faq />
      <Contact />
    </main>
  )
}
