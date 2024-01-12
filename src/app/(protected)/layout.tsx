import Header from "@/components/Header";

const navigation = [
  { id: 1, name: "Dashboard", href: "/dashboard" },
  { id: 2, name: "Settings", href: "/settings" },
  { id: 3, name: "Logout", href: "/logout" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header navigation={navigation} />
      {children}
    </section>
  );
}
