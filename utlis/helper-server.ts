"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export async function SaveSecurely(text:string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(text, saltRounds);

  return hash;
}
export async function CheckSecurely(hash:string, text:string) {
  return bcrypt.compare(text, hash);
}

export async function isSessionAvailable() {
  const session = await getServerSession(authOptions);
  return (
    session ?? {
      success: false,
      status: 401,
      message: "Kindly SignIn / Sign In First",
    }
  );
}
