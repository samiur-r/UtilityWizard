import Checkout from "@/components/Checkout";
import { loggedInUser } from "@/utils/user";

const course = {
  id: 1,
  title: "Frontend Development",
  price: 50,
};

const Dashboard = async () => {
  const user = loggedInUser();

  return (
    <section className="container mx-auto p-5">
      <p>Dashboard</p>
      <div className="max-w-[200px] mt-5">
        <Checkout course={course} user={user} />
      </div>
    </section>
  );
};

export default Dashboard;
