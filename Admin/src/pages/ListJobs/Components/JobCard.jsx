// Jobvia / Admin / src / pages / ListJobs Components / JobCard.jsx
import { CompanyFallback, CompanyPlaceholder } from "../../../assets/assets";
import {
  Building2,
  Clock,
  Edit3,
  GraduationCap,
  ListChecks,
  MapPin,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { formatSalary } from "../../../utils/salary";
import Badge from "./Badge";
import JobCardInfoItem from "./JobCardInfoItem";
import JobCardInfoList from "./JobCardInfoList";

const JobCard = ({ job, onEdit, onDelete, onViewApplicants }) => {
  return (
    <article
      key={job.id}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-purple-500" />

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="relative shrink-0 self-center sm:self-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img
                src={job.image || CompanyPlaceholder}
                alt={job.company}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = CompanyFallback;
                }}
              />
            </div>

            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <Building2 size={16} className="text-indigo-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {job.role}
                </h2>
                <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                  <Building2 size={14} />
                  {job.company}
                </p>
              </div>

              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                {formatSalary(job.salary)}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.techstack?.map((tech, idx) => (
                <Badge key={idx} variant="tech" className="max-w-full">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <JobCardInfoItem Icon={MapPin}>
                {job.locations?.join(" • ")}
              </JobCardInfoItem>

              <JobCardInfoItem Icon={Clock}>{job.experience}</JobCardInfoItem>

              <JobCardInfoItem Icon={Tag}>{job.category}</JobCardInfoItem>

              <JobCardInfoItem Icon={Users}>
                {job.openings} {job.openings > 1 ? "openings" : "opening"}
              </JobCardInfoItem>
            </div>

            <p className="mt-3 text-sm text-slate-600 line-clamp-2">
              {job.overview}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <JobCardInfoList
            title="Responsibilities"
            Icon={ListChecks}
            items={job.responsibilities}
          />

          <JobCardInfoList
            title="Criteria"
            Icon={ListChecks}
            items={job.criteria}
          />

          <JobCardInfoList
            title="Education"
            Icon={GraduationCap}
            items={job.education}
          />
        </div>

        <div className="flex items-center gap-2 mt-auto pt-4">
          <button
            onClick={() => onEdit(job)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors text-sm font-medium"
          >
            <Edit3 size={14} />
            Edit
          </button>

          <button
            onClick={() => onViewApplicants(job)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm font-medium"
          >
            <Users size={14} />
            Applicants
          </button>

          <button
            onClick={() => onDelete(job.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-sm font-medium"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
