import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/prisma/connectDb";
// import { CheckSecurely, SaveSecurely } from "@/utlis";
import { NextAuthOptions } from "next-auth";
import * as z from "zod";
import {
  authFormSchema,
  authFormSchemaSignin,
  authFormSchemaSignup,
  signinSchema,
  signupSchema,
} from "@/components/Pages/signIn_signUp/schema/sign-in-up-schema";
import { CheckSecurely, SaveSecurely } from "@/utlis";

type FormType = "signin" | "signup";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables");
}
function isFormType(value: any): value is FormType {
  return value === "signin" || value === "signup";
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Usernam", type: "text" },
        password: { label: "Password", type: "password" },
        FormType: { label: "formType", type: "text" },
      },

      async authorize(credentials, req) {
        if (!credentials) throw new Error("Missing credentials");
        const FormType = credentials.FormType;
        if (!isFormType(FormType)) {
          throw new Error("Invalid formType");
        } 

        let formSchema = authFormSchema(FormType);
       
    
        type FormValuesType = z.infer<typeof formSchema>;
        const result = formSchema!.safeParse(credentials);

        if (!result.success) {
          console.error("zod safeParse issue occured", result.error);
          throw new Error("Invalid Input");
        } else {
          const data: FormValuesType = result.data;

          // WORKING ON DB
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: data.email }, { username: data.username }],
            },
          });

          // SIGN UP FLOW
          if (FormType === "signup") {
            if (existingUser) {
              throw new Error("User already exists");
            } else {
              const password = await SaveSecurely(data.password);
              const newUser = await prisma.user.create({
                data: {
                  email: data.email,
                  username: data.username,
                  password: password,
                  provider: false,
                },
              });
              const { email, username, id } = newUser;

              return {
                id,
                email,
                username: username ?? undefined,
              };

            }
          } else {
            // SIGN IN FLOW
            if (!existingUser) {
              throw new Error("User doesn't exists please Sign up");
            } else if (existingUser.provider) {
              throw new Error("User hasn't signed in with creadentials");
            } else if (
              !(await CheckSecurely(
                existingUser.password!,
                credentials.password
              ))
            ) {
              throw new Error("User's password didn't match");
            }
            else {
              return {
                id: existingUser.id,
                email: existingUser.email,
                username: existingUser.username ?? undefined,
              };

            }

          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user; // attach your returned user here
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      const userEmail = token.user.email;
      const dbUser = await prisma.user.findFirst({
        where: { email: userEmail },
      });
      if (!dbUser) {
        console.error("Please signin to continue");

        return session;
      }
      if (dbUser.provider) {
        Object.assign(token.user, dbUser);
      }

      session.user = token.user; // this sets what goes to the frontend

      delete session.user.password;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {
        // create new user
        await prisma.user.create({
          data: {
            email: user.email,
            username: user.name,
            provider: true,
          },
        });
      }

      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
