"use server";

import { TLoginSchema, LoginSchema } from "@/validations/auth";

export const login = async (values: TLoginSchema) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) return { error: "Invalid fields!" };
};
