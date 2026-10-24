import "../Styles/InterviewQuestion.css";
import { useInterviewQuestionService } from "../Services/InterviewQuestionServices";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import CompanyCard from "./CompanyCard";
import RoleCard from "./RoleCard";

const InterviewQuestion = () => {
  const { companies, roles, loading } = useInterviewQuestionService();

  if (loading) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4f46e5"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-mono bg-linear-to-br from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {/* -------- Left Side -------- */}
          <div>
            <section className="mt-6 md:mt-8">
              <div className="flex flex-col lg:flex-row xl:flex-row md:flex-row items-center justify-between mb-6">
                <h2 className="text-md lg:text-md sm:text-xl md:text-2xl font-bold text-gray-900">
                  Interview Questions By Company
                </h2>

                <Link
                  to="/companies"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
                >
                  View All Companies
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 gap-4">
                {companies.map((company) => (
                  <CompanyCard company={company} key={company._id} />
                ))}
              </div>
            </section>
          </div>

          {/* -------- Right Side -------- */}
          <div>
            <section className="mt-6 md:mt-8">
              <div className="flex flex-col lg:flex-row xl:flex-row md:flex-row items-center justify-between mb-6">
                <h2 className="text-md lg:text-md sm:text-xl md:text-2xl font-bold text-gray-900">
                  Interview Questions By Role
                </h2>

                <Link
                  to="/roles"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
                >
                  View All Roles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 gap-4">
                {roles.map((role) => (
                  <RoleCard role={role} key={role._id} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestion;
