import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import SelectedNotes from "@/components/SelectedNotes";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();
  const [currentDocRef, setCurrentDocRef] = useState();

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
        <Navbar
          currentDocRef={currentDocRef}
          setCurrentDocRef={setCurrentDocRef}
        />
        {user && (
          <SelectedNotes currentDocRef={currentDocRef} userId={user.uid} />
        )}
      </main>
    </>
  );
}
