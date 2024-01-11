import Header from "@/components/Header";

const navigation = [{ id: 1, name: "Get Started", href: "/login" }];

export default function Home() {
  return (
    <section>
      <Header navigation={navigation} />
      <div className="container mx-auto p-5">
        <p className="text-2xl text-center">Landing page</p>
      </div>
    </section>
  );
}
