// components/AuthFormWrapper.tsx
"use client"

import { Suspense } from "react"
import AuthForm from "./AuthForm"
import LoadingPage from "@/components/Pages/Loading/LoadingPage"

export default function AuthFormWrapper({ FormType }: { FormType: "signin" | "signup" }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthForm FormType={FormType} />
    </Suspense>
  )
}
