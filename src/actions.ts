"use server"

import { SessionData, sessionOptions, defaultSession } from "@/lib"
import { getIronSession } from "iron-session"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Authentication
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if(!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}

export const signup = async (prevState: { error: undefined | string }, formData: FormData) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return { error: "Username already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  session.userId = newUser.id.toString();
  session.username = username;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const login = async (prevState: { error: undefined | string }, formData: FormData) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { username: formUsername },
  });

  if (!user) {
    return { error: "Wrong Credentials" };
  }

  const isPasswordValid = await bcrypt.compare(formPassword, user.password);

  if (!isPasswordValid) {
    return { error: "Wrong Credentials" };
  }

  session.userId = user.id.toString();
  session.username = formUsername;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession()
  session.destroy();
  redirect("/")
}

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  if (!session.userId) {
    return { error: "User not logged in" };
  }

  await prisma.user.update({
    where: { id: Number(session.userId) },
    data: { username: newUsername },
  });

  session.username = newUsername;
  await session.save();
  revalidatePath("/profile");
};
