"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema, TRegisterSchema } from "@/validations/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import { generateVerificationToken } from "@/utils/token";
import { sendVerificationEmail } from "@/utils/mail";

export const register = async (values: TRegisterSchema) => {
  try {
    const validation = RegisterSchema.safeParse(values);

    if (!validation.success) throw new Error("Invalid fields!");

    const { name, email, password } = validation.data;

    const userExists = await getUserByEmail(email);
    if (userExists) throw new Error("Email already in use!");

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent! please verify your email." };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
