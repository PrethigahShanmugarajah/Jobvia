// Jobvia / Client / src / components / ContactItem.jsx

const ContactItem = ({ icon, text, href }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
        {icon}
      </div>

      {href ? (
        <a
          href={href}
          className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base pt-1"
        >
          {text}
        </a>
      ) : (
        <span className="text-gray-600 text-sm sm:text-base pt-1">{text}</span>
      )}
    </div>
  );
};

export default ContactItem;
