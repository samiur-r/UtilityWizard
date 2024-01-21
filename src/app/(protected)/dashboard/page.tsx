import { getDashboardContent } from "@/actions/dashboard";
import Banner from "@/components/Banner";
import Checkout from "@/components/Checkout";
import DataTable from "@/components/DataTable";
import { loggedInUser } from "@/utils/user";

const course = {
  id: 1,
  title: "Frontend Development",
  price: 50,
};

const Dashboard = async () => {
  const user = await loggedInUser();

  const res = await getDashboardContent();

  if (res.type === "admin")
    return (
      <section className="container mx-auto p-5 mt-28">
        <DataTable items={res?.data ?? []} />
      </section>
    );
  else if (res.type === "user")
    return (
      <section className="container mx-auto p-5 mt-28">
        {/* <p>Dashboard</p>
        <div className="max-w-[200px] mt-5">
          <Checkout course={course} user={user} />
        </div> */}
        <Banner />
      </section>
    );
  else return null;
};

export default Dashboard;
