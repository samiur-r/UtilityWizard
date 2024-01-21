import { db } from "@/lib/db";

const getBillsByUserId = async (userId: string) => {
  try {
    const bills = await db.bills.findMany({ where: { userId } });
    return bills;
  } catch {
    return null;
  }
};

export { getBillsByUserId };
