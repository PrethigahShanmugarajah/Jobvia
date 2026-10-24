import { FileInputField } from "../../../components/FormField/FileInputField";
import { InputField } from "../../../components/FormField/InputField";
import { Link2 } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const CompanyForm = ({
  handleSubmit,
  logoFile,
  setLogoFile,
  website,
  setWebsite,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* -------- Logo Upload -------- */}
      <FileInputField
        label="Company Logo"
        name="logo-upload"
        accept="image/*"
        size="m"
        required
        triggerText="Choose File"
        value={logoFile}
        onChange={(file) => {
          setLogoFile(file);
        }}
      />

      {/* -------- Website -------- */}
      <InputField
        label="Website URL"
        name="website"
        type="url"
        placeholder="https://example.com"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        iconLeft={<Link2 size={18} />}
        required
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none flex items-center justify-center gap-2 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <ThreeDots
                height="24"
                width="40"
                color="#FFFFFF"
                secondaryColor="#E2E8F0"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </>
          ) : (
            "Add Company"
          )}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
