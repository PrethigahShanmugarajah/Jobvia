const PageHeader = ({ title, description, Icon }) => {
  return (
    <header className="text-center mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-3">
        <Icon size={32} className="shrink-0 text-indigo-600" />
        <span className="leading-tight">{title}</span>
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">{description}</p>
    </header>
  );
};

export default PageHeader;
