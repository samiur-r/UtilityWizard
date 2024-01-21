import { db } from "@/lib/db";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      where: { role: "USER" },
      select: {
        meter: true,
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    return users;
  } catch {
    return null;
  }
};

export { getUserByEmail, getUserById, getUsers };
