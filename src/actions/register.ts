"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema, TRegisterSchema } from "@/validations/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";

export const register = async (values: TRegisterSchema) => {
  try {
    const validation = RegisterSchema.safeParse(values);

    if (!validation.success) throw new Error("Invalid fields!");

    const { name, email, password } = validation.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await getUserByEmail(email);

    if (userExists) throw new Error("Email already in use!");

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: send verification email

    return { success: "User created" };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
