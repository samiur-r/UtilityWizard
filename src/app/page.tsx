import Header from "@/components/Header";
import Hero from "@/sections/Hero";
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
    </section>
  );
}
