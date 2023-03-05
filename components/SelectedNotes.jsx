import { db } from "@/utils/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { BsArrowReturnLeft } from "react-icons/bs";

const SelectedNotes = ({ currentDocRef, userId, setWordCount }) => {
  const [currentNote, setCurrentNote] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");

  const getCurrentNote = async () => {
    setCurrentTitle("");
    setCurrentContent("");

    const docRef = doc(db, "users", userId, "notes", currentDocRef);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrentNote(docSnap.data());

      setCurrentTitle(docSnap.data().title);
      setCurrentContent(docSnap.data().content);

      setWordCount(docSnap.data().content.split(" ").length);
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

    setWordCount(e.target.innerText.split(" ").length);
  };

  useEffect(() => {
    if (currentDocRef) {
      getCurrentNote();
    }
    console.log("just to make sure");
  }, [currentDocRef]);

  return (
    <div className="w-screen h-full p-4 bg-darkBg text-darkText">
      {currentNote && currentDocRef.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div
            contentEditable
            onInput={changeTitle}
            className="p-1 text-4xl font-bold"
          >
            {currentTitle}
          </div>
          <div
            contentEditable
            onInput={changeContent}
            className="p-1 text-base"
          >
            {currentContent}
          </div>
        </div>
      ) : (
        <h1 className="flex flex-col content-center justify-center w-full h-full text-4xl font-bold text-center text-darkBgSecondary">
          Choose a Note <br></br> or <br></br> Create a New Note <br></br>
          <BsArrowReturnLeft className="w-full my-4 text-center justify-self-center" />
        </h1>
      )}
    </div>
  );
};
export default SelectedNotes;
