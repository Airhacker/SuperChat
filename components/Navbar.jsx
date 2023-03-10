import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import NotesList from "./NotesList";

const Navbar = ({ currentDocRef, setCurrentDocRef, wordCount }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");

  //variants for sidebar, control the animation and initial state
  const sideBarVariants = {
    hidden: {
      x: "-100%",
    },
    show: {
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "-100%",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  //sign out function
  const userSignOut = () => {
    auth.signOut();
  };

  //get current user profile from firestore
  const getCurrentUserProfile = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("Document data:", userDocSnap.data());
      setCurrentUser(userDocSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const getCurrentDoc = async () => {
    const docRef = doc(db, "users", user.uid, "notes", currentDocRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCurrentTitle(docSnap.data().title);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (user) {
      getCurrentUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (currentDocRef) {
      getCurrentDoc();
    }
  }, [currentDocRef]);

  return (
    <nav className="sticky top-0 flex content-center justify-between w-screen gap-4 p-4 border-b border-darkSecondary bg-darkBg text-darkText">
      <div className="flex content-center gap-4">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AiOutlineMenu className="text-xl" />
        </button>

        <div>
          <span>{currentTitle}</span>
        </div>
      </div>

      <div className="flex content-center px-2 text-darkBgSecondary">
        <span>({wordCount})</span>
      </div>

      {/* Side menu component */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={sideBarVariants}
            className="absolute top-0 left-0 flex w-screen h-screen bg-transparent"
          >
            <div className="flex flex-col w-9/12 h-screen bg-sidebarBg">
              <div className="flex content-center w-full gap-2 p-4 mb-2">
                {currentUser ? (
                  <>
                    <img
                      src={currentUser.photoURL}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full"
                    ></img>
                    <span className="self-center text-base font-semibold">
                      {currentUser.userName}&apos;s Notes
                    </span>
                  </>
                ) : (
                  "User not logged in"
                )}
              </div>
              <div>
                {user ? (
                  <NotesList
                    userId={user.uid}
                    currentDocRef={currentDocRef}
                    setCurrentDocRef={setCurrentDocRef}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                ) : (
                  ""
                )}
              </div>

              {/* this div hold the controls */}
              <div>
                {user ? (
                  <button
                    onClick={userSignOut}
                    className="flex content-center w-full gap-2 p-4 text-base text-darkTextSecondary hover:text-darkBgSecondary"
                  >
                    <TbDoorExit className="self-center" />
                    Sign Out
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* this is the overlay, clicking makes the sidebar dissapear*/}
            <div
              className="w-3/12 h-screen bg-black bg-opacity-10 backdrop-blur-sm"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
