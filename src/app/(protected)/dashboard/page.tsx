import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  return <section className="container mx-auto px-5">Dashboard</section>;
};

export default Dashboard;
