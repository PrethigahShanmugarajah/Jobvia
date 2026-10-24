import "../Styles/Save.css";
import MissingSavedItem from "../Components/MissingSavedItem";
import JobCard from "../../../components/JobCard";
import {
  handleToggleSaveJobService,
  openConfirmPopupService,
} from "../Services/SaveServices";
import RoleQuestionCard from "../../../components/RoleQuestionCard";
import { cleanQuestionText } from "../Utils/questionText";
import { getRoleName } from "../Utils/roleName";
import { getQuestionAnswer } from "../Utils/questionAnswer";
import { getCompanyNames } from "../Utils/companyNames";
import CompanyQuestionCard from "../../../components/CompanyQuestionCard";
import { formatSavedDate } from "../Utils/date";

const SavedItemsList = ({
  items,
  currency,
  appliedJobs,
  storageKey,
  setConfirmPopup,
  fetchSavedItems,
  onToggleSave,
  roleById,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {items.map((item, idx) => {
        if (item.missing) {
          return (
            <MissingSavedItem
              key={`missing-${idx}`}
              item={item}
              onToggleSave={onToggleSave}
            />
          );
        }

        if (item.source === "job") {
          const job = item.job;

          return (
            <JobCard
              key={`job-${item.id}-${idx}`}
              job={job}
              item={item}
              idx={idx}
              variant="saved"
              currency={currency}
              appliedJobs={appliedJobs}
              fetchSavedItems={fetchSavedItems}
              onApply={(selectedJob) =>
                openConfirmPopupService(
                  selectedJob,
                  appliedJobs,
                  storageKey,
                  setConfirmPopup,
                )
              }
              onToggleSaveService={handleToggleSaveJobService}
            />
          );
        }

        if (item.source === "role") {
          const q = item.q;

          return (
            <RoleQuestionCard
              key={`role-${item.id}-${idx}`}
              questionNumber={idx + 1}
              question={cleanQuestionText(q.question)}
              isSaved={true}
              variant="saved"
              idx={idx}
              onToggleSave={() =>
                onToggleSave(
                  item.source && item.id
                    ? `${item.source}:${item.id}`
                    : item.raw,
                )
              }
              answer={q.answerParagraph || q.answer || ""}
              keyPoints={q.keyPoints || []}
              roleName={q.roleId ? getRoleName(q.roleId) : ""}
              isImportant={q.isImportant}
              askedBy={Array.isArray(q.askedBy) ? q.askedBy : []}
            />
          );
        }

        const q = item.q;
        const main = getQuestionAnswer(q);
        const companyNames = getCompanyNames(item.companies);
        const cleanedQuestion = cleanQuestionText(q.question);

        return (
          <CompanyQuestionCard
            key={`company-${item.id}-${idx}`}
            questionNumber={idx + 1}
            question={cleanedQuestion}
            date={item.dateAdded}
            formatDate={formatSavedDate}
            isSaved={true}
            variant="saved"
            idx={idx}
            onToggleSave={() =>
              onToggleSave(
                item.source && item.id ? `${item.source}:${item.id}` : item.raw,
              )
            }
            answer={main || q.answer || q.answerParagraph || ""}
            keyPoints={q.keyPoints || []}
            details={
              <>
                {companyNames.length > 0 && (
                  <div>Company: {companyNames.join(", ")}</div>
                )}
                {q.roleId && (
                  <div className="mt-1">
                    Role:{" "}
                    <span className="font-medium">
                      {roleById(q.roleId)?.roleName || getRoleName(q.roleId)}
                    </span>
                  </div>
                )}
              </>
            }
          />
        );
      })}
    </div>
  );
};

export default SavedItemsList;
