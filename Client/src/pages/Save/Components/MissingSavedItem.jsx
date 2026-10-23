// Jobvia / Client / src / pages / Save / Components / MissingSavedItem.jsx
import "../Styles/Save.css";
import { Bookmark } from "lucide-react";

const MissingSavedItem = ({ item, onToggleSave }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Missing question</h3>

        <button
          onClick={() => onToggleSave(item.raw)}
          className="p-2 cursor-pointer rounded-lg bg-white text-gray-600 border border-gray-100"
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-gray-500">Saved id: {item.raw}</p>

      <p className="text-sm text-red-500 mt-2">
        This saved id no longer maps to any question in current datasets.
      </p>
    </div>
  );
};

export default MissingSavedItem;
