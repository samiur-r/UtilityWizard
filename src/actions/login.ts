"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { getUserByEmail } from "@/services/user";
import { sendVerificationEmail } from "@/utils/mail";
import { generateVerificationToken } from "@/utils/token";
import { TLoginSchema, LoginSchema } from "@/validations/auth";
import { AuthError } from "next-auth";

export const login = async (values: TLoginSchema) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) return { error: "Invalid fields!" };

  const { email, password } = validation.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Email does not exist!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent! please verify your email." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false
    });
    return { redirect: true };
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
