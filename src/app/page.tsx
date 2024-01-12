import Header from "@/components/Header";
import { auth } from "@/auth";
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
      <div className="container mx-auto p-5">
        <p className="text-2xl text-center">Landing page</p>
      </div>
    </section>
  );
}
