const EmptyQuestions = () => {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-600 mb-2">
        No questions found
      </h3>

      <p className="text-gray-500 mb-6">Try selecting a different company</p>
    </div>
  );
};

export default EmptyQuestions;
