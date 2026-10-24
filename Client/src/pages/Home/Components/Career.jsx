import "../Styles/Career.css";
import { useCareerService } from "../Services/CareerServices";

const Career = () => {
  const { duplicatedCompanies, placeholder, isExternal } = useCareerService();

  return (
    <div className="min-h-screen font-mono bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Join Our <span className="text-blue-600">Featured</span> Companies
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities with industry leaders who are
            actively. Your next big role awaits!
          </p>
        </div>

        <div className="mb-10 relative overflow-hidden">
          <div className="flex animate-scroll-right-to-left items-center py-6">
            {duplicatedCompanies.map((company, index) => {
              const href = company.website || "#";

              return (
                <div
                  key={`row1-${index}`}
                  className="group shrink-0 mx-3 sm:mx-4 transition-all duration-300 w-40 sm:w-48 md:w-56 lg:w-60 xl:w-64"
                >
                  <div className="flex flex-col items-center">
                    <a
                      href={href}
                      target={isExternal(href) ? "_blank" : undefined}
                      className="block w-36 h-18 sm:w-44 sm:h-24 md:w-48 md:h-28 lg:w-56 lg:h-32"
                    >
                      <img
                        src={company.logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          if (
                            e.currentTarget.src !== placeholder(company.name)
                          ) {
                            e.currentTarget.src = placeholder(company.name);
                          }
                        }}
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left-to-right items-center py-6">
            {duplicatedCompanies
              .slice()
              .reverse()
              .map((company, index) => {
                const href = company.website || "#";

                return (
                  <div
                    key={`rows-${index}`}
                    className="group shrink-0 mx-3 sm:mx-4 p-4 sm:p-6 transition-all duration-300 w-40 sm:w-48 md:w-56 lg:w-60 xl:w-64"
                  >
                    <div className="flex flex-col items-center">
                      <a
                        href={href}
                        target={isExternal(href) ? "_blank" : undefined}
                        rel={
                          isExternal(href) ? "noopener noreferrer" : undefined
                        }
                        className="block w-36 h-18 sm:w-44 sm:h-24 md:w-48 md:h-28 lg:w-56 lg:h-32"
                      >
                        <img
                          src={company.logo}
                          alt="Logo"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            if (
                              e.currentTarget.src !== placeholder(company.name)
                            ) {
                              e.currentTarget.src = placeholder(company.name);
                            }
                          }}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
