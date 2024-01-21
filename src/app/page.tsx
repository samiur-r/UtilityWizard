import Header from "@/components/Header";
import Contact from "@/sections/home/Contact";
import CTA from "@/sections/home/Cta";
import Features from "@/sections/home/Features";
import Footer from "@/sections/home/Footer";
import Hero from "@/sections/home/Hero";
import Stats from "@/sections/home/Stats";
import Support from "@/sections/home/Support";
import Testimonials from "@/sections/home/Testimonials";
import { loggedInUser } from "@/utils/user";

export default async function Home() {
  const user = await loggedInUser();
  let navigation = [];

  if (user)
    navigation = [
      { id: 1, name: "Dashboard", href: "/dashboard" },
      { id: 2, name: "Settings", href: "/settings" },
      { id: 3, name: "Logout", href: "/logout" },
    ];
  else navigation = [{ id: 1, name: "Get Started", href: "/login" }];

  return (
    <section>
      <Header navigation={navigation} />
      <Hero />
      <Features />
      <Stats />
      <Support />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />
    </section>
  );
}
