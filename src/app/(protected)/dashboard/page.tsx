import { getDashboardContent } from "@/actions/dashboard";
import Banner from "@/components/Banner";
import Checkout from "@/components/Checkout";
import DataTableAdmin from "@/components/DataTableAdmin";
import DataTableUser from "@/components/DataTableUser";
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
        <DataTableAdmin items={res?.data ?? []} />
      </section>
    );
  else if (res.type === "user")
    return (
      <section className="container mx-auto p-5 mt-28">
        {res.data && res.data.length ? (
          <DataTableUser items={res?.data ?? []} user={user} />
        ) : (
          <Banner />
        )}
      </section>
    );
  else return null;
};

export default Dashboard;
