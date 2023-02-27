import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import NotesList from "./NotesList";

const Navbar = ({ currentDocRef, setCurrentDocRef }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    if (user) {
      getCurrentUserProfile();
    }
  }, [user]);

  return (
    <nav className="sticky top-0 flex content-center justify-between w-screen gap-4 p-4 border-b border-darkSecondary bg-darkBg text-darkText">
      <div className="flex content-center">
        <button
          className=""
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AiOutlineMenu className="text-xl" />
        </button>
      </div>

      <div>
        {/* <span>This will hold the name of the selected notes</span> */}
      </div>

      <div className="flex content-center">
        <button>
          <BsThreeDots className="text-xl" />
        </button>
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
              <div className="flex content-center w-full gap-2 p-4 border-b border-darkText">
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
                    className="flex content-center w-full gap-2 p-4 text-base text-darkTextSecondary"
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
