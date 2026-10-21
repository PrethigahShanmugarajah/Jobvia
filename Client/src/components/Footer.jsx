// Jobvia / Client / src / components / Footer.jsx
import { useAppContext } from "../context/appContext";
import { Logo, Prethigah } from "../assets/assets";
import SocialIcon from "./SocialIcon";
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";
import FooterLink from "./FooterLink";
import {
  ArrowRight,
  Award,
  Bookmark,
  Briefcase,
  Building,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserCog,
  UserPen,
  Users,
} from "lucide-react";
import ContactItem from "./ContactItem";

const Footer = () => {
  const { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_LOCATION, PORTFOLIO_URL } =
    useAppContext();

  return (
    <footer className="bg-linear-to-b from-white to-blue-50 font-mono pt-8 sm:pt-10 md:pt-12 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 md:mb-12">
          <div className="space-y-4">
            <div className="flex items-start sm:items-center gap-3">
              <a href="/" className="block shrink-0">
                <img
                  src={Logo}
                  alt="Jobvia"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-sm"
                />
              </a>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-700 bg-clip-text text-transparent">
                  Jobvia
                </h2>

                <p className="text-xs sm:text-sm text-gray-500">
                  Find Your Dream Job
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600">
              Connecting talented professionals with top companies worldwide.
              Your career journey starts here.
            </p>

            <div className="flex gap-3 sm:gap-4 pt-2">
              <SocialIcon
                href="#"
                icon={<LuLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Linkedin"
              />

              <SocialIcon
                href="#"
                icon={<LuTwitter className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Twitter"
              />

              <SocialIcon
                href="#"
                icon={<LuFacebook className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Facebook"
              />

              <SocialIcon
                href="#"
                icon={<LuInstagram className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Instagram"
              />
            </div>
          </div>

          {/* -------- Quick Links -------- */}
          <div>
            <h3 className="text-base sm:text-lg md:text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-blue-100 inline-block">
              Quick Links
            </h3>

            <ul className="space-y-3 mt-4">
              <FooterLink
                href="/jobs"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Find Jobs
              </FooterLink>

              <FooterLink
                href="/companies"
                icon={<Building className="w-4 h-4" />}
              >
                Companies
              </FooterLink>

              <FooterLink href="/roles" icon={<UserCog className="w-4 h-4" />}>
                Roles
              </FooterLink>

              <FooterLink href="/saved" icon={<Bookmark className="w-4 h-4" />}>
                Saved
              </FooterLink>

              <FooterLink
                href="/contact"
                icon={<UserPen className="w-4 h-4" />}
              >
                Contact
              </FooterLink>
            </ul>
          </div>

          {/* -------- For Employers -------- */}
          <div>
            <h3 className="text-base sm:text-lg md:text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-blue-100 inline-block">
              For Employers
            </h3>

            <ul className="space-y-3 mt-4">
              <FooterLink href="/" icon={<ArrowRight className="w-4 h-4" />}>
                Post a Job
              </FooterLink>

              <FooterLink href="/" icon={<Award className="w-4 h-4" />}>
                Pricing
              </FooterLink>

              <FooterLink href="/" icon={<Users className="w-4 h-4" />}>
                Recruitment Solutions
              </FooterLink>

              <FooterLink href="/" icon={<Briefcase className="w-4 h-4" />}>
                Employer Dashboard
              </FooterLink>

              <FooterLink href="/" icon={<Shield className="w-4 h-4" />}>
                Employer Branding
              </FooterLink>
            </ul>
          </div>

          {/* -------- Contact Info -------- */}
          <div>
            <h3 className="text-base sm:text-lg md:text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-blue-100 inline-block">
              Contact Us
            </h3>

            <div className="space-y-3 mt-4">
              <ContactItem
                icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                text={CONTACT_EMAIL}
                href={`mailto:${CONTACT_EMAIL}`}
              />

              <ContactItem
                icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5" />}
                text={CONTACT_PHONE}
                href={`tel:${CONTACT_PHONE}`}
              />

              <ContactItem
                icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
                text={CONTACT_LOCATION}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6 md:my-8"></div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
          <img
            src={Prethigah}
            alt="Prethigah"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />

          <span className="text-xs sm:text-sm">Designed By</span>

          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-blue-600 transition-colors text-xs sm:text-sm"
          >
            Prethigah
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
