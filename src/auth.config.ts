import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/validations/auth";
import { getUserByEmail } from "./services/user";
import config from "./config";

export default {
  providers: [
    Google({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    Github({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
