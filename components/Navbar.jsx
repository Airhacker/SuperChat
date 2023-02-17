import { AiOutlineMenu } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex w-screen gap-4 p-4 bg-darkBg text-darkText">
      <div>
        <button
          className="text-base"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AiOutlineMenu className="text-2xl" />
        </button>
      </div>

      <div>
        <span>yes lawd</span>
      </div>

      <motion.div className="absolute top-0 left-0 w-10/12 h-screen p-4 bg-darkBg">
        Side bar
      </motion.div>
    </nav>
  );
};
export default Navbar;
