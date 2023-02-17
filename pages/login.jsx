import { FcGoogle } from "react-icons/fc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Unable to login with Google");
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (user) route.push("/");
    } catch (error) {}
  }, [user]);

  return (
    <div className="flex flex-col content-center justify-center w-screen h-screen gap-8 text-center bg-darkBg text-darkText">
      <h1 className="text-4xl">Sign in</h1>
      <button
        onClick={signInWithGoogle}
        className="flex content-center self-center justify-center w-1/2 gap-2 p-2 text-black bg-white rounded-md justify-self-center"
      >
        <FcGoogle className="flex self-center justify-self-center" />
        Sign in with Google
      </button>
    </div>
  );
};
export default Login;