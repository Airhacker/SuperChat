import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
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
  deleteDoc,
  doc,
} from "firebase/firestore";

const NotesList = ({
  userId,
  currentDocRef,
  setCurrentDocRef,
  setWordCount,
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

  // function to delete a doc
  const deleteSelectedDoc = async (noteId) => {
    if (currentDocRef === noteId) {
      setCurrentDocRef("");
    }

    if (noteId) {
      await deleteDoc(doc(db, "users", userId, "notes", noteId));
    }

    console.log("Document deleted");
  };

  // function to set doc based on click
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
            <div
              key={note.id}
              className="flex content-center justify-between w-full px-4 py-2 text-base border-b border-current text-darkTextSecondary "
            >
              {/* holds the title of the doc */}
              <div onClick={() => setCurrentDoc(note.id)}>
                {note.data.title}
              </div>

              {/* delete button for the doc*/}
              <button onClick={() => deleteSelectedDoc(note.id)}>
                <MdDelete />
              </button>
            </div>
          );
        })}

      <button
        className="flex content-center w-full gap-2 p-2 text-base text-darkTextSecondary"
        onClick={addPage}
      >
        <AiOutlinePlus className="self-center" />
        Add a page
      </button>
    </div>
  );
};
export default NotesList;
