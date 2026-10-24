export const getBadgeClasses = (variant, baseClass) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    tech: "bg-indigo-50 text-indigo-700",
    location: "bg-emerald-50 text-emerald-700",
  };
  return `${baseClass} ${variants[variant] || variants.default}`;
};
