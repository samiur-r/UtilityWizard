import Header from "@/components/Header";

const navigation = [{ id: 1, name: "Get Started", href: "/login" }];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header navigation={navigation} />
      <div className="mt-20">{children}</div>
    </section>
  );
}
