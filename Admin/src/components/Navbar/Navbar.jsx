/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// Jobvia / Admin / src / components / Navbar / Navbar.jsx
import "./Navbar.css";
import {
  Briefcase,
  Building,
  ChevronDown,
  Home,
  List,
  LogIn,
  LogOut,
  Menu,
  User,
  UserCheck,
  X,
} from "lucide-react";
import { useAppContext } from "../../context/appContext";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Logo } from "../../assets/assets";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    Icon: Home,
  },
  {
    key: "jobs",
    label: "Jobs",
    Icon: Briefcase,
  },
  {
    key: "listJob",
    label: "List Job",
    Icon: List,
  },
  {
    key: "company",
    label: "Companies",
    Icon: Building,
  },
  {
    key: "companyQuestions",
    label: "Company Questions",
    Icon: Building,
    dropdown: [
      {
        key: "listCompanyQ",
        label: "List Company Questions",
      },
    ],
  },
  {
    key: "roleQuestions",
    label: "Role Questions",
    Icon: UserCheck,
    dropdown: [
      {
        key: "listRoleQ",
        label: "List Role Questions",
      },
    ],
  },
];

const ROUTES = {
  dashboard: "/",
  company: "/companies",
  jobs: "/addjobs",
  listJob: "/list/jobs",
  companyQuestions: "/company-questions",
  listCompanyQ: "/list/company-questions",
  roleQuestions: "/role-questions",
  listRoleQ: "/list/role-questions",
  login: "/login",
};

const Navbar = ({ logoSrc, brandName = "Jobvia", onNavigate }) => {
  const { navigate, location } = useAppContext();

  const pathToKey = (pathname) => {
    const found = Object.entries(ROUTES).find(([key, path]) => {
      if (path === "/") {
        return pathname === "/";
      }

      return (
        pathname === path ||
        pathname.startsWith(path + "/") ||
        pathname.startsWith(path)
      );
    });

    return found ? found[0] : "dashboard";
  };

  const [user, setUser] = useState(null);
  const [active, setActive] = useState(pathToKey(location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [openDropdownKey, setOpenDropdownKey] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const navContainerRef = useRef(null);
  const itemRefs = useRef({});

  const navCloseTimeoutRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLGOnly = windowWidth >= 1024 && windowWidth < 1280;

  useEffect(() => {
    if (!isLGOnly) {
      return;
    }

    const handleDocClick = (e) => {
      const container = navContainerRef.current;
      if (!container) {
        return;
      }

      if (!container.contains(e.target)) {
        setOpenDropdownKey(null);
      }
    };

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [isLGOnly]);

  /* -------- Sync Active State With Current Route -------- */
  useEffect(() => {
    const key = pathToKey(location.pathname);
    setActive(key);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* -------- Measure and update indicator position – useLayoutEffect prevents flicker -------- */
  const updateIndicator = useCallback(() => {
    const container = navContainerRef.current;
    const activeEl = itemRefs.current[active];

    if (!container || !activeEl) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();
    let rafId = null;

    const handleResize = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(updateIndicator);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateIndicator]);

  const handleNavigate = (key) => {
    const path = ROUTES[key] ?? "/";
    setActive(key);
    onNavigate?.(key);
    navigate(path);
    setMobileMenuOpen(false);
    setOpenDropdownKey(null);
  };

  /* -------- To Logout -------- */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setMobileMenuOpen(false);
  };

  const logoToUse = logoSrc ?? Logo;

  const closeTimeoutRef = useRef(null);
  const userMenuContainerRef = useRef(null);

  const openUserMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setUserMenuOpen(true);
  };
  const startCloseTimer = (delay = 250) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false);
      closeTimeoutRef.current = null;
    }, delay);
  };

  const openNavDropdown = (key) => {
    if (navCloseTimeoutRef.current) {
      clearTimeout(navCloseTimeoutRef.current);
      navCloseTimeoutRef.current = null;
    }

    setOpenDropdownKey(key);
  };

  const closeNavDropdownDelayed = (delay = 200) => {
    if (navCloseTimeoutRef.current) {
      clearTimeout(navCloseTimeoutRef.current);
    }

    navCloseTimeoutRef.current = setTimeout(() => {
      setOpenDropdownKey(null);
      navCloseTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      if (navCloseTimeoutRef.current) {
        clearTimeout(navCloseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="w-full font-[pacifico] sticky top-0 z-50">
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between gap-3 h-20 lg:h-24">
            {/* -------- Logo -------- */}
            <div
              className="flex min-w-0 items-center gap-1 group cursor-pointer"
              onClick={() => handleNavigate("dashboard")}
            >
              <div className="relative p-2 transition-shadow">
                {logoToUse ? (
                  <img
                    src={Logo}
                    alt="Jobvia"
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <span className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-indigo-600">
                    {brandName[0]}
                  </span>
                )}
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="font-semibold text-md leading-tight text-gray-800 xl:text-sm min-[1407px]:text-md">
                  {brandName}
                </span>

                <span className="text-xs text-gray-400  min-[1407px]:block">
                  Find Your Dream Job
                </span>
              </div>
            </div>

            {/* -------- Desktop Navigation -------- */}
            <div className="hidden min-[1407px]:flex min-[1407px]:flex-1 min-[1407px]:justify-center">
              <div ref={navContainerRef} className="relative">
                {active && indicatorStyle.width > 0 && (
                  <div
                    className="absolute -bottom-2 h-1 rounded-full bg-linear-to-r from-indigo-300 to-pink-300 transition-all duration-300 ease-out"
                    style={{
                      left: indicatorStyle.left,
                      width: indicatorStyle.width,
                      boxShadow: "0 0 8px rgba(165, 180, 252, 0.5)",
                    }}
                  />
                )}

                <ul className="flex items-center gap-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.Icon;

                    const isActiveParent =
                      active === item.key ||
                      (item.dropdown &&
                        isLGOnly &&
                        item.dropdown.some((sub) => active === sub.key));

                    return (
                      <React.Fragment key={item.key}>
                        <li
                          className="relative"
                          onMouseEnter={() =>
                            item.dropdown &&
                            isLGOnly &&
                            openNavDropdown(item.key)
                          }
                          onMouseLeave={() =>
                            item.dropdown &&
                            isLGOnly &&
                            closeNavDropdownDelayed(200)
                          }
                        >
                          <div
                            ref={(el) => {
                              itemRefs.current[item.key] = el;
                              if (item.dropdown && el && isLGOnly) {
                                item.dropdown.forEach((sub) => {
                                  itemRefs.current[sub.key] = el;
                                });
                              }
                            }}
                            className="flex items-center"
                          >
                            <button
                              onClick={(e) => {
                                if (item.dropdown && isLGOnly) {
                                  e.preventDefault();
                                  setOpenDropdownKey((prev) =>
                                    prev === item.key ? null : item.key,
                                  );

                                  return;
                                }
                                handleNavigate(item.key);
                              }}
                              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActiveParent
                                  ? "text-indigo-700 bg-indigo-50/70 shadow-sm"
                                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/60"
                              }`}
                            >
                              <Icon className="w-5 h-5" />

                              <span className="whitespace-nowrap">
                                {item.label}
                              </span>

                              {item.dropdown && isLGOnly && (
                                <div
                                  className={`absolute left-1/2 top-full mt-2 z-50 rounded-xl transition-all duration-150 transform -translate-x-1/2 ${
                                    openDropdownKey === item.key
                                      ? "opacity-100 translate-y-0 pointer-events-auto"
                                      : "opacity-0 -translate-y-2 pointer-events-none"
                                  }`}
                                  onMouseEnter={() => openNavDropdown(item.key)}
                                  onMouseLeave={() =>
                                    closeNavDropdownDelayed(200)
                                  }
                                >
                                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white shadow-sm"></div>

                                  <div
                                    className={`rounded-xl p-0.5 ${
                                      openDropdownKey === item.key
                                        ? "animate-border"
                                        : "bg-transparent"
                                    }`}
                                    style={{
                                      background:
                                        openDropdownKey === item.key
                                          ? undefined
                                          : "transparent",
                                    }}
                                  >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden min-w-55">
                                      {item.dropdown.map((sub) => {
                                        const isActiveSub = active === sub.key;

                                        return (
                                          <button
                                            key={sub.key}
                                            onClick={() => {
                                              handleNavigate(sub.key);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center gap-2 ${isActiveSub ? "bg-indigo-50/70 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                                          >
                                            <span className="w-2 h-2 rounded-full bg-indigo-300"></span>

                                            <span>{sub.label}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </button>
                          </div>
                        </li>

                        {!isLGOnly &&
                          item.dropdown &&
                          item.dropdown.map((sub) => {
                            const isActiveSub = active === sub.key;

                            return (
                              <li key={sub.key} className="relative">
                                <div
                                  ref={(el) => (itemRefs.current[sub.key] = el)}
                                  className="flex items-center"
                                >
                                  <button
                                    onClick={() => {
                                      handleNavigate(sub.key);
                                    }}
                                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                      isActiveSub
                                        ? "text-indigo-700 bg-indigo-50/70 shadow-sm"
                                        : "text-gray-600 hover:text-indigo-600 hover:bg-white/60"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>

                                    <span className="whitespace-nowrap">
                                      {sub.label}
                                    </span>
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* -------- Right Side -------- */}
            <div className="flex shrink-0 items-center gap-3 min-[1407px]:ml-2">
              <div className="hidden md:block lg:block xl:flex items-center gap-3 shrink-0">
                {user ? (
                  <div
                    ref={userMenuContainerRef}
                    className="relative"
                    onMouseEnter={openUserMenu}
                    onMouseLeave={() => startCloseTimer(250)}
                  >
                    <button
                      onClick={() => {
                        if (closeTimeoutRef.current) {
                          clearTimeout(closeTimeoutRef.current);
                          closeTimeoutRef.current = null;
                        }

                        setUserMenuOpen((s) => !s);
                      }}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-gray-800 cursor-pointer shadow-md transition-all duration-200"
                    >
                      <User className="w-4 h-4 text-indigo-500" />

                      <span className="text-sm font-medium">{user.name}</span>

                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-xl z-50 overflow-hidden transition-all duration-200 transform origin-top-right ${
                        userMenuOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-0.5 ${
                          userMenuOpen ? "animate-border" : "bg-transparent"
                        }`}
                        style={{
                          background: userMenuOpen ? undefined : "transparent",
                        }}
                      >
                        <div className="bg-white rounded-lg shadow-md">
                          <button
                            onClick={handleLogout}
                            className="w-full cursor-pointer text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigate("login")}
                    className="group cursor-pointer relative overflow-hidden px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-pink-500 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                    <span className="relative flex items-center gap-2">
                      <LogIn className="w-5 h-5" />

                      <span>Login</span>
                    </span>
                  </button>
                )}
              </div>

              {/* -------- Toggle -------- */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex min-[1407px]:hidden p-2.5 rounded-xl text-gray-600 hover:bg-white/60 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* -------- For Mobile Navigation -------- */}
          {mobileMenuOpen && (
            <div className="min-[1407px]:hidden py-4 border-t border-gray-200/50 animate-slideDown">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.Icon;
                  const isActiveParent = active === item.key;

                  return (
                    <div key={item.key} className="space-y-1">
                      <button
                        onClick={() => handleNavigate(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${isActiveParent ? "bg-indigo-50/70 text-indigo-700 shadow-sm" : "text-gray-700 hover:bg-white/60"}`}
                      >
                        <Icon className="w-5 h-5" />

                        <span className="text-sm font-medium flex-1">
                          {item.label}
                        </span>
                      </button>

                      {item.dropdown && (
                        <div className="ml-8 flex flex-col gap-1 border-l-2 border-indigo-200 pl-2">
                          {item.dropdown.map((sub) => {
                            const isActiveSub = active === sub.key;

                            return (
                              <button
                                key={sub.key}
                                onClick={() => handleNavigate(sub.key)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                                  isActiveSub
                                    ? "bg-indigo-50/70 text-indigo-700 font-medium"
                                    : "text-gray-600 hover:bg-white/60 hover:text-indigo-600"
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
