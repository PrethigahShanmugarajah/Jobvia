import { Briefcase, MapPin, Users } from "lucide-react";
import { getLocationColor } from "../../../constants/getLocationColor";
import { getExperienceColor } from "../../../constants/getExperienceColor";
import { formatSalary } from "../../../utils/salary";
import { getJobTypeColor } from "../../../constants/getJobTypeColor";

export const getJobInfo = (job, CURRENCY) => [
  {
    icon: MapPin,
    color: "blue",
    label: "Location",
    value: job.location,
    colorFn: getLocationColor,
  },
  {
    icon: Users,
    color: "purple",
    label: "Experience",
    value: job.experience,
    colorFn: getExperienceColor,
  },
  {
    icon: null,
    currency: CURRENCY,
    color: "green",
    label: "Salary",
    value: formatSalary(job.salary, job.salaryType, CURRENCY),
    customClass:
      "bg-linear-to-r from-green-100 to-emerald-100 text-green-700 border-green-200",
  },
  {
    icon: Briefcase,
    color: "orange",
    label: "Job Type",
    value: job.jobType,
    colorFn: getJobTypeColor,
  },
  {
    icon: Users,
    color: "pink",
    label: "Openings",
    value: `${job.openings} position${job.openings > 1 ? "s" : ""}`,
    colorFn: getJobTypeColor,
    customClass:
      "bg-linear-to-r from-pink-100 to-rose-100 mt-1 text-pink-700 border-pink-200",
  },
];
