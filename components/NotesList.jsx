import { AiOutlinePlus } from "react-icons/ai";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

const NotesList = ({
  userId,
  currentDocRef,
  setCurrentDocRef,
  isOpen,
  setIsOpen,
}) => {
  const [currentNotes, setCurrentNotes] = useState([]);

  const getNotes = async () => {
    setCurrentNotes([]);

    const q = query(
      collection(db, "users", userId, "notes"),
      orderBy("createdTime", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setCurrentNotes((currentNotes) => [
            ...currentNotes,
            {
              id: change.doc.id,
              data: change.doc.data(),
            },
          ]);
        }
        if (change.type === "removed") {
          setCurrentNotes((currentNotes) =>
            currentNotes.filter((note) => note.id !== change.doc.id)
          );
        }
      });
    });

    // OLD CODE FOR REFERENCE
    // const querySnapshot = await getDocs(
    //   collection(db, "users", userId, "notes")
    // );
    // querySnapshot.forEach((doc) => {
    //   setCurrentNotes((currentNotes) => [
    //     ...currentNotes,
    //     { id: doc.id, data: doc.data() },
    //   ]);
    // });
    // console.log(currentNotes);
  };

  const addPage = async () => {
    const docRef = await addDoc(collection(db, "users", userId, "notes"), {
      title: "Untitled",
      content: "Type away...",
      createdTime: serverTimestamp(),
    });

    setCurrentDoc(docRef.id);

    console.log("Document written with ID: ", docRef.id);
  };

  const setCurrentDoc = (noteId) => {
    console.log(noteId);
    setCurrentDocRef(noteId);
  };

  useEffect(() => {
    getNotes();
    console.log("useEffect");
  }, [currentDocRef]);

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
