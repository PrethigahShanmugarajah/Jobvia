import "../Styles/Company.css";

const CompanyList = ({
  companies,
  selectedCompany,
  setSelectedCompany,
  setShowAllQuestions,
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 justify-center gap-3">
        {companies.map((company) => {
          const isSelected = selectedCompany === company._id;

          return (
            <button
              key={company._id}
              onClick={() => {
                setSelectedCompany(company._id);
                setShowAllQuestions(false);
              }}
              className="flex flex-col cursor-pointer items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <div className="mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded">
                  <img
                    src={company.logo}
                    alt={company.companyName}
                    className="w-full h-full object-cover max-w-full"
                  />
                </div>
              </div>

              <span
                className={`company-name font-semibold text-sm mb-1 text-center whitespace-normal wrap-break-word ${isSelected ? "text-blue-700" : "text-gray-700"}`}
              >
                {company.companyName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyList;
