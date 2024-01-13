"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserById } from "@/services/user";
import { loggedInUser } from "@/utils/user";
import { NewPasswordSchema, TNewPasswordSchema } from "@/validations/auth";

export const newPassword = async (values: TNewPasswordSchema) => {
  const user = await loggedInUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  if (!dbUser.password) return { error: "You can not update password" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const passwordMatch = await bcrypt.compare(
    values.oldPassword,
    dbUser.password
  );
  if (!passwordMatch) return { error: "Invalid Credential" };

  const hashedPassword = await bcrypt.hash(values.newPassword, 10);

  await db.user.update({
    where: { id: dbUser.id },
    data: { password: hashedPassword },
  });

  return { success: "Password updated successfully" };
};
