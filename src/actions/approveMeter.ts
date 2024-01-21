"use server";

import { db } from "@/lib/db";
import { createDummyBills } from "@/services/bills";
import { getUserById } from "@/services/user";
import { loggedInUser } from "@/utils/user";

export const approveMeter = async (userId: string) => {
  try {
    const user = await loggedInUser();
    if (!user) return { error: "Unauthorized" };

    const dbUser = await getUserById(user.id);
    if (!dbUser || dbUser.role !== "ADMIN") return { error: "Unauthorized" };

    const meter = await db.meter.create({
      data: {
        status: "APPROVED",
        userId: userId,
      },
    });

    createDummyBills(userId, meter.id);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
