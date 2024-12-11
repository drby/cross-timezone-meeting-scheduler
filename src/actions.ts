"use server"

import { SessionData, sessionOptions, defaultSession } from "@/lib"
import { getIronSession } from "iron-session"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let username = "john";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if(!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}
export const login = async (prevState: { error: undefined | string }, formData: FormData ) => {
  const session = await getSession()

  const formUsername = formData.get("username") as string
  const formPassword = formData.get("password") as string

  const user = await prisma.user.findUnique({
    where: { username: formUsername },
  });

    if (!user || user.password !== formPassword) {
      return { error: "Wrong Credentials" };
    }

    session.userId = "1"
    session.username = formUsername
    session.isLoggedIn = true

    await session.save()
    redirect("/")

}
export const logout = async () => {
  const session = await getSession()
  session.destroy();
  redirect("/")
}

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};