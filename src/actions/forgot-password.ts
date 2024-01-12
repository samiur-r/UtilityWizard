"use server";

import * as z from "zod";

import { getUserByEmail } from "@/services/user";
import { sendPasswordResetEmail } from "@/utils/mail";
import { generatePasswordResetToken } from "@/utils/token";
import { ForgotPasswordSchema } from "@/validations/auth";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

  return { success: "Password reset email sent!" };
};
