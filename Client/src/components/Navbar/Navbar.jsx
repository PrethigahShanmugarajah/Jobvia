// Jobvia / Client / src / components / Navbar / Navbar.jsx
import "./Navbar.css";
import {
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  LogIn,
  LogOut,
  Menu,
  Search,
  User,
  UserCog,
  UserPen,
  X,
} from "lucide-react";
import { useAppContext } from "../../context/appContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/assets";

const navItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
  {
    id: "jobs",
    label: "Jobs",
    path: "/jobs",
    icon: <Search size={18} />,
  },
  {
    id: "companies",
    label: "Companies",
    path: "/companies",
    icon: <Briefcase size={18} />,
  },
  {
    id: "roles",
    label: "Roles",
    path: "/roles",
    icon: <UserCog size={18} />,
  },
  {
    id: "saved",
    label: "Saved",
    path: "/saved",
    icon: <Bookmark size={18} />,
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    icon: <UserPen size={18} />,
  },
];

const Navbar = () => {
  const { navigate, location, STORAGE_KEY } = useAppContext();

  const path = location.pathname || "/";

  const matched =
    navItems.find((item) => item.path === path) ||
    navItems.find((item) => item.path !== "/" && path.startsWith(item.path));

  const activeNavItem = matched ? matched.id : "home";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(null);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [STORAGE_KEY]);

  useEffect(() => {
    const onClick = (e) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isUserMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (item) => {
    navigate(item.path);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("token");
    localStorage.removeItem("appliedJobs");
    localStorage.removeItem("savedJobs");
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleUserMenu = () => setIsUserMenuOpen((v) => !v);

  const getInitials = (name) => {
    if (!name) {
      return "U";
    }

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-3"
          : "bg-linear-to-r from-blue-50 to-indigo-50 py-5"
      }`}
    >
      <div className="container font-mono mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative shrink-0">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Jobvia"
                  width={36}
                  height={36}
                  className="object-cover rounded-full"
                />
              </Link>
            </div>

            <div className="flex flex-col leading-4">
              <span className="text-xl md:text-2xl xl:text-2xl lg:text-sm font-bold bg-linear-to-r from-blue-400 to-indigo-700 bg-clip-text text-transparent">
                Jobvia
              </span>

              <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                Find your dream job
              </span>
            </div>
          </div>

          {/* -------- Desktop Navigation -------- */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <button
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center lg:text-sm xl:text-lg cursor-pointer space-x-2 px-4 md:px-5 py-2 md:py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                    activeNavItem === item.id
                      ? "text-blue-600 bg-blue-50 shadow-inner"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <span
                    className={`transition-transform duration-300 ${
                      isHovered === item.id ? "scale-110" : "scale-100"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="font-medium">{item.label}</span>
                </button>

                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-linear-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-300 ${
                    isHovered === item.id
                      ? "w-3/4 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* -------- Right Side -------- */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="group cursor-pointer relative px-5 md:px-6 py-2 md:py-3 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                  <div className="relative flex items-center space-x-2">
                    <LogIn className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />

                    <span className="font-medium text-blue-600 group-hover:text-white transition-colors duration-300">
                      Login
                    </span>
                  </div>
                </button>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="profile-button cursor-pointer flex items-center gap-3 px-3 py-2 rounded-full transition-all duration-300 bg-white/60 hover:shadow-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-medium text-white animate-gradient">
                      {getInitials(user.name)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm lg:text-xs text-gray-800 font-medium">
                        {user.name}
                      </span>

                      {isUserMenuOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 p-2 transition transform origin-top-right ${
                      isUserMenuOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <Link
                      to="/view-profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      <User className="w-4 h-4 text-gray-600" />

                      <span className="text-sm text-gray-700">
                        View Profile
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-gray-600" />

                      <span className="text-sm text-gray-700">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* -------- Mobile Toggle -------- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 hover:shadow-md transition duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
        {/* -------- Mobile Menu -------- */}
        <div
          className={`lg:hidden overflow-y-auto transition-all duration-500 ${
            isMobileMenuOpen
              ? "max-h-[80vh] opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 max-w-full">
            <div className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center space-x-3 w-full p-3 sm:p-4 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                    activeNavItem === item.id
                      ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeNavItem === item.id
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span className="font-medium flex-1 text-left">
                    {item.label}
                  </span>
                </button>
              ))}

              <div className="pt-2 border-t border-gray-100">
                <div className="space-y-3">
                  {!user ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition duration-300 w-full text-sm sm:text-base"
                    >
                      <LogIn className="w-5 h-5" />

                      <span className="font-medium">Login</span>
                    </button>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 px-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-medium text-white">
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {user.name}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Link
                          to="/view-profile"
                          className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition duration-300 text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="w-5 h-5" />

                          <span className="font-medium">Profile</span>
                        </Link>

                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition duration-300 text-sm"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
