import "../Styles/Save.css";
import { useAppContext } from "../../../context/appContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { applyJobOnce, getAppliedJobs } from "../Utils/appliedJobs";
import { findRoleById, getAvailableRoles } from "../Utils/role";
import {
  confirmApplyService,
  fetchSavedItemsService,
  toggleSaveService,
} from "../Services/SaveServices";
import { getAvailableCompanies } from "../Utils/company";
import { getUnifiedSavedQuestions } from "../Utils/savedQuestion";
import { getSavedJobItems } from "../Utils/savedJob";
import { filterSavedQuestions } from "../Utils/savedFilter";
import { getCombinedSortedDisplay } from "../Utils/savedDisplay";
import SavedFilters from "../Components/SavedFilters";
import { ThreeCircles } from "react-loader-spinner";
import SavedItemsList from "../Components/SavedItemsList";
import { Bookmark } from "lucide-react";
import ConfirmPopup from "../../../components/ConfirmPopup";

const Save = () => {
  const {
    location,
    CURRENCY,
    STORAGE_KEY,
    STORAGE_JOBS_KEY,
    STORAGE_APPLIED_KEY,
    BASE_URL,
    STORAGE_QUESTIONS_KEY,
  } = useAppContext();

  const stateFilter = location?.state ?? {};

  const [savedItems, setSavedItems] = useState({
    jobs: [],
    interviewQuestions: [],
    roleQuestions: [],
  });
  const [loading, setLoading] = useState(true);

  const [uiFilter, setUiFilter] = useState(stateFilter.filterType || "all");
  const [uiFilterId, setUiFilterId] = useState(stateFilter.id || null);

  const [appliedJobs, setAppliedJobs] = useState(() =>
    getAppliedJobs(STORAGE_APPLIED_KEY),
  );

  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    jobId: null,
    role: "",
    company: "",
  });
  const [applying, setApplying] = useState(false);

  const [roles, setRoles] = useState([]);
  const [companiesState, setCompaniesState] = useState([]);

  const roleById = (id) => findRoleById(roles, id);

  const fetchSavedItems = useCallback(
    () =>
      fetchSavedItemsService(
        STORAGE_KEY,
        STORAGE_JOBS_KEY,
        STORAGE_QUESTIONS_KEY,
        setLoading,
        setSavedItems,
        setRoles,
        setCompaniesState,
      ),
    [STORAGE_KEY, STORAGE_JOBS_KEY, STORAGE_QUESTIONS_KEY],
  );

  useEffect(() => {
    fetchSavedItems();
  }, [fetchSavedItems]);

  const availableRoles = useMemo(
    () => getAvailableRoles(savedItems, roles),
    [savedItems, roles],
  );

  const availableCompanies = useMemo(
    () => getAvailableCompanies(savedItems, companiesState),
    [savedItems, companiesState],
  );

  const toggleSave = (rawId) =>
    toggleSaveService(rawId, STORAGE_KEY, fetchSavedItems);

  const unifiedSaved = useMemo(
    () => getUnifiedSavedQuestions(savedItems),
    [savedItems],
  );

  const jobSavedItems = useMemo(
    () => getSavedJobItems(savedItems.jobs, BASE_URL),
    [savedItems.jobs, BASE_URL],
  );

  const filteredSaved = useMemo(
    () =>
      filterSavedQuestions(
        unifiedSaved,
        uiFilter,
        uiFilterId,
        availableRoles,
        availableCompanies,
      ),
    [unifiedSaved, uiFilter, uiFilterId, availableRoles, availableCompanies],
  );

  const clearFilter = () => {
    setUiFilter("all");
    setUiFilterId(null);
  };

  const focusRaw = stateFilter.focusRaw || null;

  const combinedSortedDisplay = useMemo(
    () =>
      getCombinedSortedDisplay(
        filteredSaved,
        jobSavedItems,
        focusRaw,
        uiFilter,
        uiFilterId,
        availableCompanies,
        availableRoles,
      ),
    [
      filteredSaved,
      jobSavedItems,
      focusRaw,
      uiFilter,
      uiFilterId,
      availableCompanies,
      availableRoles,
    ],
  );

  const closeConfirmPopup = () => {
    setConfirmPopup((c) => ({ ...c, open: false }));
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-gray-50 to-blue-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-white/20 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Saved Questions & Jobs
              </h1>

              <p className="text-sm text-gray-600">
                Saved across roles, companies & jobs
              </p>
            </div>
          </div>

          <SavedFilters
            uiFilter={uiFilter}
            setUiFilter={setUiFilter}
            uiFilterId={uiFilterId}
            setUiFilterId={setUiFilterId}
            availableRoles={availableRoles}
            availableCompanies={availableCompanies}
            clearFilter={clearFilter}
          />
        </div>

        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <ThreeCircles
              visible={true}
              height="60"
              width="60"
              color="#A855F7"
              ariaLabel="three-circles-loading"
            />
          </div>
        ) : combinedSortedDisplay.length > 0 ? (
          <SavedItemsList
            items={combinedSortedDisplay}
            currency={CURRENCY}
            appliedJobs={appliedJobs}
            storageKey={STORAGE_KEY}
            setConfirmPopup={setConfirmPopup}
            fetchSavedItems={fetchSavedItems}
            onToggleSave={toggleSave}
            roleById={roleById}
          />
        ) : (
          <div className="col-span-full">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-gray-300" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No saved items
              </h3>

              <p className="text-gray-500 max-w-sm mx-auto">
                Save questions on role or company pages — or save jobs on the
                Find Job page — to see them here.
              </p>
            </div>
          </div>
        )}
      </div>

      {confirmPopup.open && (
        <ConfirmPopup
          onClose={closeConfirmPopup}
          onConfirm={() =>
            confirmApplyService(
              confirmPopup.jobId,
              applying,
              STORAGE_KEY,
              setApplying,
              (jobId) =>
                applyJobOnce(jobId, setAppliedJobs, STORAGE_APPLIED_KEY),
              closeConfirmPopup,
            )
          }
          loading={applying}
          title="Confirm Application"
          description={
            <>
              Are you sure you want to apply for{" "}
              <strong>{confirmPopup.role}</strong> at{" "}
              <strong>{confirmPopup.company}</strong>?
            </>
          }
          confirmText="Confirm"
          closeText="Cancel"
        />
      )}
    </div>
  );
};

export default Save;
