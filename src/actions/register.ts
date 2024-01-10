"use server";

import { RegisterSchema, TRegisterSchema } from "@/validations/auth";

export const register = async (values: TRegisterSchema) => {
  const validation = RegisterSchema.safeParse(values);

  if (!validation.success) return { error: "Invalid fields!" };
};
