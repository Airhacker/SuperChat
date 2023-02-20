import { AiOutlinePlus } from "react-icons/ai";

const NotesList = () => {
  return (
    <div>
      <div>
        <button className="flex content-center w-full gap-2 p-4 text-base text-darkTextSecondary">
          <AiOutlinePlus className="self-center" />
          Add a page
        </button>
      </div>
    </div>
  );
};
export default NotesList;
