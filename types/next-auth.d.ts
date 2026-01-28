import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      username?: string;
      provider?: string;
      password?: string; // optional so we can delete
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username?: string;
    provider?: string;
    password?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      username?: string;
      provider?: string;
      password?: string;
    };
  }
}
