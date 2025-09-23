import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export function isValidURL(urlData) {
  try {
    new URL(urlData);
    return true;
  } catch (_) {
    return false;
  }
}
export function UnderDevelopmentFeature() {
  alert("This feature is currently under Development , HOLD TIGHT !");
}

let timer;
export function SaveToLocalStorage(key, value) {
  if (timer) clearTimeout(timer); // to clear previous timeId not current one

  timer = setTimeout(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, 1500);
}
export function RetriveFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function DeleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export async function isSessionAvailable() {
  const session = await getServerSession(authOptions);
  return (
    session ?? {
      success: false,
      status: 401,
      message: "Kindly SignIn / LogIn First",
    }
  );
}
