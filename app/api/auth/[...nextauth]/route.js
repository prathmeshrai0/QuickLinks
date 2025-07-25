import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Usernam", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // SIGN IN FLOW

        if (credentials.isSignUp == "true") {
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.email },
                { username: credentials.username },
              ],
            },
          });
          if (existingUser) {
            if (existingUser.email === credentials.email) {
              throw new Error("User already exists with same Email");
            } else if (existingUser.username === credentials.username) {
              throw new Error("User already exists with same Username");
            }
          } else {
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                username: credentials.username,
                password: credentials.password,
                provider: false,
              },
            });

            const { email, username } = newUser;
            return { email, username };
          }
        }
        // LOGIN FLOW
        else {
          const givenUsername = credentials.givenUsername;
          const whereCondition = givenUsername
            ? { username: credentials.username }
            : { email: credentials.email };
          const existingUser = await prisma.user.findFirst({
            where: whereCondition,
          });
          if (!existingUser) {
            throw new Error("User doesn't exists please Sign up");
          } else if (existingUser.password != credentials.password) {
            throw new Error("User's password didn't match");
          }
          return existingUser;
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
      console.log("in jwt acc ", account, " user ", user, " token ", token);

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user; // this sets what goes to the frontend
      console.log("session ", session);

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
});

export { handler as GET, handler as POST };
