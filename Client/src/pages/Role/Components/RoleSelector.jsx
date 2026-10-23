// Jobvia / Client / src / pages / Role / Components / RoleSelector.jsx
import "../Styles/Role.css";
import { ThreeDots } from "react-loader-spinner";
import { ChevronRight } from "lucide-react";

const RoleSelector = ({
  loadingRoles,
  roles,
  selectedRoleId,
  setSelectedRoleId,
}) => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4">
        {loadingRoles ? (
          <div className="flex justify-center w-full py-8">
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#4f46e5"
              radius="9"
              ariaLabel="loading roles"
            />
          </div>
        ) : (
          roles.map((role) => {
            const isActive = selectedRoleId === role._id;
            return (
              <button
                key={role._id}
                onClick={() => setSelectedRoleId(role._id)}
                className={`group cursor-pointer relative flex items-center gap-3 rounded-2xl px-5 py-4 transition-all max-w-xs sm:max-w-none ${
                  isActive
                    ? "bg-white shadow-xl ring-2 ring-indigo-500"
                    : "bg-white/70 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded">
                  <img
                    src={role.image}
                    alt={role.roleName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-sm font-medium whitespace-normal wrap-break-word text-left">
                  {role.roleName}
                </span>

                {isActive && (
                  <span className="absolute -right-1 -top-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow">
                    <ChevronRight className="h-3 w-3 text-indigo-600" />
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RoleSelector;
