import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/lib/mongoDB";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";

let userExists;
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        connectDB();

        const { email } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        // const isPasswordMatched = await bcrypt.compare(password, user.password);

        // if (!isPasswordMatched) {
        //   throw new Error("Invalid Email or Password");
        // }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {      
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email } = user;
        try {
          await connectDB();

          userExists = await User.findOne({ email });
          if (userExists.role === "admin") {
            return NextResponse.json({ msg: ["Success."] });
          } else {
            throw new Error("Unable to authenticate. 😥");
            //return NextResponse.json({ msg: ["Unable to login."] });
          }
          // if (!userExists) {
          //   const res = await fetch("http://localhost:3000/api/user", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       name,
          //       email,
          //     }),
          //   });
          //   if (res.ok) {
          //     return user;
          //   }
          // }
        } catch (error) {
          console.log("routing err: ", error);
          throw new Error("Unable to authenticate. 😥");
        }
      }
       return user
    },
    async jwt({ token, user }) {
      token.role = "admin";
      user && (token.email = user)
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    protected: "/protected"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
