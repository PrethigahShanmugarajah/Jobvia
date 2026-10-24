import "../Styles/Role.css";
import { Briefcase } from "lucide-react";

const EmptyQuestions = () => {
  return (
    <div className="text-center py-8 sm:py-12 bg-white rounded-2xl shadow-lg">
      <Briefcase className="h-10 w-10 text-gray-300 mx-auto" />

      <p className="mt-4 text-base sm:text-lg text-gray-600">
        No questions yet for this role.
      </p>
    </div>
  );
};

export default EmptyQuestions;
