"use server"

import { SessionData, sessionOptions, defaultSession } from "@/lib"
import { getIronSession } from "iron-session"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const formPreferredTimeZone = formData.get("preferredTimeZone") as string;
  const formDailyStartTime = formData.get("dailyStartTime") as string;
  const formDailyEndTime = formData.get("dailyEndTime") as string;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return { error: "Username already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      preferredTimeZone: formPreferredTimeZone,
      dailyStartTime: formDailyStartTime,
      dailyEndTime: formDailyEndTime,
      isLoggedIn: true,
    },
  });

  await prisma.calendar.create({
    data: {
      name: `${username}'s Calendar`,
      owner: {
        connect: { id: newUser.id },
      },
    },
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

  await prisma.user.update({
    where: { id: user.id },
    data: { isLoggedIn: true },
  });

  session.userId = user.id.toString();
  session.username = formUsername;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession()

  await prisma.user.update({
    where: { id: Number(session.userId) },
    data: { isLoggedIn: false },
  });

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

export const createEvent = async (prevState: { error: undefined | string }, formData: FormData) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const start = new Date(formData.get('start') as string);
  const end = formData.get('end') ? new Date(formData.get('end') as string) : new Date(start.getTime() + 60 * 60 * 1000);
  const userIds = (formData.get('userIds') as string).split(',').map(Number);
  const creatorId = Number(session.userId);

  if (!userIds.includes(creatorId)) {
    userIds.push(creatorId);
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });

  if (users.length !== userIds.length) {
    throw new Error('One or more user IDs do not exist');
  }

  const calendars = await prisma.calendar.findMany({
    where: {
      ownerId: {
        in: userIds,
      },
    },
  });

  const calendarIds = calendars.map((calendar) => calendar.id);

  if (calendarIds.length !== userIds.length) {
    throw new Error('One or more calendar IDs do not exist');
  }

  const newEvent = await prisma.event.create({
    data: {
      title,
      description,
      start,
      end,
      users: {
        connect: userIds.map((id) => ({ id })),
      },
      calendars: {
        connect: calendarIds.map((id) => ({ id })),
      },
    },
  });

  return newEvent;
};