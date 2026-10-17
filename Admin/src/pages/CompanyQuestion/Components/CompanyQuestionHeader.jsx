// Jobvia / Admin / src / pages / CompanyQuestion / Components /  CompanyQuestionHeader.jsx

const CompanyQuestionHeader = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl py-3 md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        Company Interview Questions
      </h1>

      <p className="text-slate-600">
        Add company and upload a question bank CSV (Question, Answer, KeyPoints,
        PostDate optional).
      </p>
    </header>
  );
};

export default CompanyQuestionHeader;
