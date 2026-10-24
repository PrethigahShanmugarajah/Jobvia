const FooterLink = ({ href, children, icon }) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group text-sm sm:text-base"
      >
        <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>

        <span className="group-hover:translate-x-1 transition-transform">
          {children}
        </span>
      </a>
    </li>
  );
};

export default FooterLink;
