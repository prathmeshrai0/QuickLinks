import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/prisma/connectDb";
import { CheckSecurely, SaveSecurely } from "@/utlis";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // 👈 REQUIRED to decrypt the session

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

        if (credentials.isSignUp === "true") {
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
            const password = await SaveSecurely(credentials.password);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                username: credentials.username,
                password: password,
                provider: false,
              },
            });

            const { email, username, id } = newUser;
            return { email, username, id };
          }
        }
        // LOGIN FLOW
        else {
          const givenUsername = credentials.givenUsername === "true";

          const whereCondition = givenUsername
            ? { username: credentials.username }
            : { email: credentials.email };

          const existingUser = await prisma.user.findFirst({
            where: whereCondition,
          }); 
          
          if (!existingUser) {
            throw new Error("User doesn't exists please Sign up");
          } else if (
           ! await  CheckSecurely(existingUser.password, credentials.password)
          ) {
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

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      const userEmail = token.user.email;
      const dbUser = await prisma.user.findFirst({
        where: { email: userEmail },
      });
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
