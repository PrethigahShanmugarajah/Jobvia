// Jobvia / Client / src / pages / Contact / Components / ContactInfo.jsx
import "../Styles/Contact.css";
import { useAppContext } from "../../../context/appContext";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  const { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_LOCATION } = useAppContext();

  return (
    <div className="order-2 lg:order-1 lg:col-span-2 bg-linear-to-br from-indigo-100 to-purple-100 p-6 sm:p-8 md:p-10 text-gray-700 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">
          Let's Talk
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Have a project in mind or just want to chat? Reach out to us through
          any of these channels.
        </p>

        <div className="space-y-5 sm:space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Visit us</p>

              <p className="font-medium text-gray-700 text-sm sm:text-base">
                {CONTACT_LOCATION}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Email us</p>

              <p className="font-medium text-gray-700 text-sm sm:text-base">
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Call us</p>

              <p className="font-medium text-gray-700 text-sm sm:text-base">
                {CONTACT_PHONE}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs sm:text-sm text-gray-500">
        We typically reply within 1–2 business days.
      </div>
    </div>
  );
};

export default ContactInfo;
