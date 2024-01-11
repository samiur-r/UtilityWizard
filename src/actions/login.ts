"use server";

import { signIn } from "@/auth";
import { TLoginSchema, LoginSchema } from "@/validations/auth";
import { AuthError } from "next-auth";

export const login = async (values: TLoginSchema) => {
  try {
    const validation = LoginSchema.safeParse(values);

    if (!validation.success) return { error: "Invalid fields!" };

    const { email, password } = validation.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Logged in successful" };
  } catch (error: any) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw Error;
  }
};
