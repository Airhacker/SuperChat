import { AiOutlinePlus } from "react-icons/ai";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  addDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const NotesList = ({ userId, currentDocRef, setCurrentDocRef }) => {
  const [currentNotes, setCurrentNotes] = useState([]);

  const getNotes = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "notes")
    );
    querySnapshot.forEach((doc) => {
      setCurrentNotes((currentNotes) => [
        ...currentNotes,
        { id: doc.id, data: doc.data() },
      ]);
    });

    console.log(currentNotes);
  };

  const addPage = async () => {
    const newPage = {
      data: {
        title: "Untitled",
        content: "",
      },
    };

    setCurrentNotes([...currentNotes, newPage]);
  };

  const setCurrentDoc = (noteId) => {
    console.log(noteId);
    setCurrentDocRef(noteId);
  };

  useEffect(() => {
    getNotes();
    console.log("useEffect");
  }, []);

  return (
    <div>
      {currentNotes &&
        currentNotes.map((note) => {
          return (
            <button
              key={note.id}
              className="flex content-center w-full px-4 pt-4 text-base text-darkTextSecondary"
              onClick={() => setCurrentDoc(note.id)}
            >
              {note.data.title}
            </button>
          );
        })}

      <button
        className="flex content-center w-full gap-2 p-4 text-base text-darkTextSecondary"
        onClick={addPage}
      >
        <AiOutlinePlus className="self-center" />
        Add a page
      </button>
    </div>
  );
};
export default NotesList;
