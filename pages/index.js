import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();

  useEffect(() => {
    if (!user) route.push("/login");
  }, [user]);

  return (
    <>
      <Head>
        <title>Super Chat</title>
        <meta name="description" content="Super Chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen">
        <Navbar />
      </main>
    </>
  );
}
