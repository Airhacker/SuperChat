import { db } from "@/utils/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SelectedNotes = ({ currentDocRef, userId }) => {
  const [currentNote, setCurrentNote] = useState(null);

  const getCurrentNote = async () => {
    const docRef = doc(db, "users", userId, "notes", currentDocRef);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrentNote(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const changeTitle = (e) => {
    const docRef = doc(db, "users", userId, "notes", currentDocRef);
    console.log(e.target.innerText);
    updateDoc(docRef, {
      title: e.target.innerText,
    });
  };

  const changeContent = (e) => {
    const docRef = doc(db, "users", userId, "notes", currentDocRef);
    console.log(e.target.innerText);
    updateDoc(docRef, {
      content: e.target.innerText,
    });
  };

  useEffect(() => {
    if (currentDocRef) {
      getCurrentNote();
    }
    console.log("just to make sure");
  }, [currentDocRef]);

  return (
    <div className="w-screen h-full p-4 bg-darkBg text-darkText">
      {currentNote && (
        <>
          <h1 contentEditable onInput={changeTitle}>
            {currentNote.title}
          </h1>
          <p contentEditable onInput={changeContent}>
            {currentNote.content}
          </p>
        </>
      )}
    </div>
  );
};
export default SelectedNotes;
