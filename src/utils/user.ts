import { auth } from "@/auth";

export const loggedInUser = async () => {
  const session = await auth();

  return session?.user;
};