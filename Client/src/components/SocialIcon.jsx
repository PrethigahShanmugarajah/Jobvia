const SocialIcon = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-linear-to-r hover:from-blue-200 hover:to-purple-300 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-sm"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialIcon;
