// Jobvia / Client / src / pages / Role / Components / RoleHeader.jsx

const RoleHeader = () => {
  return (
    <div className="mb-10 text-center animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Role-Ready
        </span>{" "}
        Interviews
      </h1>

      <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
        Master your next interview with role-specific questions and company
        insights.
      </p>
    </div>
  );
};

export default RoleHeader;
