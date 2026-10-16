// Jobvia / Admin / src / pages / ListJobs Components / LocationExperienceSection.jsx
import SectionHeader from "./SectionHeader";
import { Clock, Edit3, MapPin, X } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import {
  removeArrayItemService,
  saveEditLocationService,
} from "../Services/ListJobsServices";
import Badge from "./Badge";

const LocationExperienceSection = ({
  editingJob,
  setEditingJob,
  handleFieldChange,
  editingLocationIndex,
  editingLocationText,
  setEditingLocationIndex,
  setEditingLocationText,
  startEditLocation,
  cancelEditLocation,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <SectionHeader
        icon={<MapPin size={16} className="text-indigo-500" />}
        title="Location & Experience"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {editingLocationIndex !== null ? (
            <div className="flex items-end gap-2">
              <div className="flex-1 min-w-0">
                <InputField
                  label="Locations"
                  name={`location-${editingLocationIndex}`}
                  type="text"
                  iconLeft={<MapPin size={12} className="text-slate-400" />}
                  value={editingLocationText}
                  onChange={(e) => setEditingLocationText(e.target.value)}
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!editingLocationText.trim()) return;

                  saveEditLocationService(
                    editingJob,
                    setEditingJob,
                    editingLocationIndex,
                    editingLocationText,
                  );
                  setEditingLocationIndex(null);
                  setEditingLocationText("");
                }}
                className="px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm"
                aria-label="Save location"
              >
                Save
              </button>

              <button
                type="button"
                onClick={cancelEditLocation}
                className="px-3 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200 text-sm"
                aria-label="Cancel editing location"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <label className="block font-medium text-black mb-2">
                Locations <span className="text-rose-500 ml-1">*</span>
              </label>

              <div className="flex flex-col gap-2">
                {(editingJob?.locations || []).length === 0 && (
                  <div className="text-xs text-slate-500">
                    No locations defined
                  </div>
                )}

                {(editingJob?.locations || []).map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Badge
                      variant="location"
                      className="max-w-full wrap-break-word"
                    >
                      <MapPin size={12} />
                      <span className="ml-1 max-w-xs wrap-break-word">
                        {loc}
                      </span>
                    </Badge>

                    <button
                      type="button"
                      onClick={() => startEditLocation(idx)}
                      className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
                      aria-label={`Edit location ${idx + 1}`}
                    >
                      <Edit3 size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItemService(setEditingJob, "locations", idx)
                      }
                      className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
                      aria-label={`Remove location ${idx + 1}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <InputField
            label="Experience"
            name="experience"
            type="text"
            iconLeft={<Clock size={12} className="text-slate-400" />}
            value={editingJob?.experience ?? ""}
            onChange={(e) => handleFieldChange("experience", e.target.value)}
            placeholder="2 - 5 years"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LocationExperienceSection;
