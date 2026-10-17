// Jobvia / Admin / src / pages / CompanyQuestion / Components /  CompanyQuestionForm.jsx
import { InputField } from "../../../components/FormField/InputField";
import { Building2, CheckCircle, FileText, Upload, X } from "lucide-react";
import { formatCountShort } from "../../../utils/companyQuestions";
import { FileInputField } from "../../../components/FormField/FileInputField";
import {
  handleCsvChangeService,
  handleLogoChangeService,
} from "../Services/CompanyQuestionServices";
import { ThreeDots } from "react-loader-spinner";

const CompanyQuestionForm = ({
  handleSubmit,
  companyName,
  setCompanyName,
  questionsCount,
  setQuestionsCount,
  parsedCountForDisplay,
  logoPreview,
  setLogoFile,
  setLogoPreview,
  csvFile,
  setCsvFile,
  parsedQuestions,
  setParsedQuestions,
  isSubmitting,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-2">
            <InputField
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              iconLeft={<Building2 size={18} />}
            />
          </div>

          <div>
            <InputField
              label="Questions (total)"
              name="questionsCount"
              type="text"
              placeholder="Total Question"
              value={questionsCount}
              onChange={(e) => setQuestionsCount(e.target.value)}
              required
              iconLeft={<FileText size={18} />}
            />

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-xs text-slate-500">
                Display:{" "}
                <span className="font-medium text-slate-700">
                  {formatCountShort(parsedCountForDisplay)}
                </span>
              </p>

              <p className="text-xs text-slate-400">
                You can use numbers like 1600 or 10K+
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              {logoPreview ? (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-md">
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview("");
                      const el = document.getElementById("logo-upload");
                      if (el) {
                        el.value = "";
                      }
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  <Upload size={24} />
                </div>
              )}
            </div>

            <div>
              <FileInputField
                label="Company Logo"
                name="logo-upload"
                accept="image/*"
                size="xs"
                triggerText="Choose Logo"
                imagePreview={false}
                onChange={(file, e) =>
                  handleLogoChangeService(e, setLogoFile, setLogoPreview)
                }
                labelClassName="sr-only"
                inputClassName="border-0 bg-transparent p-0"
              />

              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG, GIF up to 2MB (optional)
              </p>
            </div>
          </div>

          {/* -------- CSV Upload -------- */}
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <FileInputField
                  label={
                    <>
                      Upload CSV (Question, Answer, KeyPoints, PostDate
                      optional) <span className="text-red-500">*</span>
                    </>
                  }
                  name="csv-upload"
                  accept=".csv,text/csv"
                  size="xs"
                  imagePreview={false}
                  triggerText="Choose CSV"
                  onChange={(file, e) => {
                    if (file) {
                      handleCsvChangeService(e, setCsvFile, setParsedQuestions);
                    } else {
                      setCsvFile(null);
                      setParsedQuestions([]);
                    }
                  }}
                  labelClassName="block text-sm font-medium text-slate-700 mb-1"
                  inputClassName="rounded-lg border-indigo-200 bg-indigo-50/50"
                  required
                />

                {csvFile && (
                  <span className="block mt-2 md:inline md:ml-3 text-sm text-slate-600">
                    {csvFile.name}
                  </span>
                )}
              </div>

              {parsedQuestions.length > 0 && (
                <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={14} />
                  {parsedQuestions.length} questions loaded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------- Submit -------- */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full cursor-pointer md:w-1/3 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none flex items-center justify-center gap-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <ThreeDots
                  height="24"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </>
            ) : (
              "Add Interview Questions"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyQuestionForm;
