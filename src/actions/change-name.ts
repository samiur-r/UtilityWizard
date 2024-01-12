"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/services/user";
import { loggedInUser } from "@/utils/user";
import { NameSchema, TNameSchema } from "@/validations/auth";
import { update } from "@/auth";

export const changeName = async (values: TNameSchema) => {
  const user = await loggedInUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized" };

  const validatedFields = NameSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid name!" };

  await db.user.update({
    where: { id: user.id },
    data: { name: values.name },
  });

  update({
    user: {
      name: values.name,
    },
  });

  return { success: "Name updated successfully" };
};
