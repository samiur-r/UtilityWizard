"use server";

import { getBillsByUserId } from "@/services/bills";
import { getUserById, getUsers } from "@/services/user";
import { loggedInUser } from "@/utils/user";

export const getDashboardContent = async () => {
  const user = await loggedInUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  if (dbUser.role === "ADMIN") {
    const users = await getUsers();
    return { type: "admin", data: users };
  } else {
    const bills = await getBillsByUserId(dbUser.id);
    return { type: "user", data: bills };
  }

  return { success: true };
};
