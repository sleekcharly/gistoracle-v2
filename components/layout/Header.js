import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Menu from "@material-ui/core/Menu";
import {
  MenuIcon,
  SearchIcon,
  MoonIcon,
  UserIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  PencilAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Data from "../../utils/data";
import { Divider, Link, MenuItem, Switch } from "@material-ui/core";
import { useTheme } from "next-themes";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

function Header({ featuredNavCategories }) {
  // *** get redux state parameters ***//
  // get server-side rendered darkmode state from redux state
  const useDarkMode = () => {
    return useSelector(
      (state) => ({
        darkMode: state.UI.darkMode,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { darkMode } = useDarkMode();

  // define dispatch
  const dispatch = useDispatch();

  // Change theme handler
  const { systemTheme, theme, setTheme } = useTheme();
  const darkModeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    dispatch({
      type: currentTheme === "dark" ? "DARK_MODE_OFF" : "DARK_MODE_ON",
    });

    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    // save dark mode preference in cookies
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");

    // close menu
    handleAccountIconClose();
    handleUserMenuClose();
  };

  // desktop more nav categories from data
  const desktopNavCategories = Data.navCategories.slice(7);

  // define state parameters
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [iconAnchorEl, setIconAnchorEl] = React.useState(null);
  const [accountIconAnchorEl, setAccountIconAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);

  //open more menu
  const handleMoreButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // close more menu
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  //open logged in user menu area
  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  // close user menu area
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  // open authentication menu on account icon is clicked
  const handleAccountIconClick = (event) => {
    setAccountIconAnchorEl(event.currentTarget);
  };
  // close authentication menu
  const handleAccountIconClose = () => {
    setAccountIconAnchorEl(null);
  };
  // open mobile category menu icon
  const handleIconClick = (event) => {
    setIconAnchorEl(event.currentTarget);
  };
  // close mobile category menu icon
  const handleIconClose = () => {
    setIconAnchorEl(null);
  };
  return (
    <header className="sticky top-0 z-[1000] flex items-center bg-white py-2 px-2 lg:px-3 lg:py-1 shadow-lg dark:bg-gray-800 ">
      {/* Gist oracle logo */}
      <NextLink href="/" passHref>
        <img
          src="/images/gistoracle_logo.png"
          className="w-[70px] lg:w-[100px] lg:h-[40px] cursor-pointer"
          alt="Gist oracle logo"
        />
      </NextLink>

      {/* Navigation section */}
      <nav className="relative inline-block">
        {/* Mobile menu tabs with menu button */}
        <div className="ml-1 lg:hidden px-2 py-0 bg-white dark:bg-gray-800 hover:bg-gray-50">
          <button
            type="button"
            className="inline-flex justify-center w-full "
            id="menu-button"
            aria-label="open categories"
            aria-controls="category menu"
            aria-haspopup="true"
            onClick={handleIconClick}
          >
            <MenuIcon className="h-6 text-[#800000] dark:text-[#D7DADC]" />
          </button>

          <Menu
            id="category-icon-menu"
            anchorEl={iconAnchorEl}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(iconAnchorEl)}
            onClose={handleIconClose}
          >
            {Data.navCategories.map((mobileMenuCategory) => (
              <MenuItem
                key={mobileMenuCategory.name}
                onClick={handleIconClose}
                className="divide-y divide-gray-100 dark:divide-gray-500 "
              >
                <NextLink
                  href={`/category/${mobileMenuCategory.name}`}
                  passHref
                >
                  <p className="uppercase font-medium text-xs dark:text-white">
                    {mobileMenuCategory.name}
                  </p>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-8">
          {featuredNavCategories.map((nav) => (
            <a
              className="header-link group"
              key={nav.name}
              href={`/category/${nav.name}`}
            >
              <span className="span">{nav.name}</span>
            </a>
          ))}

          <div>
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 space-x-2"
              id="menu-button"
              aria-controls="category menu"
              aria-haspopup="true"
              onClick={handleMoreButtonClick}
            >
              <span className="text-[#800000] dark:text-[#D7DADC] uppercase font-medium text-xs">
                More
              </span>

              <ChevronDownIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
            </button>

            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMoreClose}
            >
              {desktopNavCategories.map((navMenuListCategory) => (
                <MenuItem
                  key={navMenuListCategory.name}
                  onClick={handleMoreClose}
                  className="divide-y divide-gray-100 dark:divide-gray-500 "
                >
                  <NextLink
                    href={`/category/${navMenuListCategory.name}`}
                    passHref
                  >
                    <p className="uppercase font-medium text-xs text-center text-[#800000] dark:text-white">
                      {navMenuListCategory.name}
                    </p>
                  </NextLink>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </nav>

      {/* Search bar area */}
      <div className="hidden lg:flex ml-2 items-center rounded-full bg-gray-100 dark:bg-gray-600 p-2 text-[#800000] dark:text-gray-400 flex-grow">
        <SearchIcon className="h-6 text-gray-400 dark:text-gray-500" />
        <input
          className="hidden md:inline-flex  ml-2 items-center bg-transparent outline-none placeholder-gray-300 dark:placeholder-gray-500 w-full"
          type="text"
          placeholder="Search Gistoracle"
        />
      </div>

      {/* header action areas */}
      <div className="flex items-center ml-auto">
        {/* create post button */}
        <button
          type="button"
          className="inline-flex justify-center w-full px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
        >
          <PencilAltIcon className="h-6 text-[#800000] dark:text-[#D7DADC]" />
        </button>

        {/* logged in user options button */}
        <div>
          <div
            component="button"
            className="hidden lg:flex justify-between items-center cursor-pointer border border-[#800000] dark:border-gray-400 border-opacity-20 rounded-full px-3 py-2 space-x-8 w-full hover:bg-red-50 dark:hover:bg-gray-800 group"
            id="user-menu-button"
            aria-label="logged in user menu"
            aria-controls="user menu"
            onClick={handleUserMenuClick}
            aria-haspopup="true"
          >
            <div className="flex items-center space-x-2">
              {/* loggin user profile pic */}

              <Image
                src="/favicon.ico"
                width="32"
                height="32"
                layout="fixed"
                alt=""
                className="rounded-full "
                objectFit="cover"
              />

              <div className="text-[#800000] text-xs  font-medium dark:text-[#D7DADC] d w-full">
                <p className="w-full">sleekcharly</p>
                <span className="flex items-center space-x-1">
                  <SparklesIcon className="h-3 text-[#800000] dark:text-[#D7DADC] " />
                  <p>7 vibes</p>
                </span>
              </div>
            </div>

            <ChevronDownIcon className="h-4 text-[#800000] dark:text-[#D7DADC] dark:hover:bg-[#D7DADC] dark:hover:text-[#800000]" />
          </div>
          <Menu
            id="user menu"
            elevation={0}
            getContentAnchorEl={null}
            anchorEl={userMenuAnchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem disableGutters>
              <div className="flex ml-3">
                <span className="flex items-center justify-center space-x-1">
                  <UserIcon className="h-5" />
                  <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                    My Profile
                  </p>
                </span>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem disableGutters>
              <div className="flex  ml-3">
                <span className="flex items-center justify-center space-x-1">
                  <CogIcon className="h-5" />
                  <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                    UserSettings
                  </p>
                </span>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem disableGutters>
              <div className="flex ml-3">
                <span className="flex items-center justify-center space-x-1">
                  <LogoutIcon className="h-5" />
                  <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                    Logout
                  </p>
                </span>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem disableGutters>
              <div className="flex space-x-5 ml-3">
                <span className="flex items-center justify-center space-x-1">
                  <MoonIcon className="h-5" />
                  <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                    Dark Mode
                  </p>
                </span>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChanger}
                  size="small"
                />
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* large screen authentication buttons */}
        <div className="hidden md:flex items-center space-x-6 ml-6">
          <button className="text-[#800000] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 hover:bg-gray-100 dark:hover:text-black tracking-wide transition duration-200">
            Login
          </button>

          <button className="text-[#fafafa] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 bg-[#933a16] dark:bg-gray-500 dark:hover:bg-[#800000] dark:hover:text-white">
            Signup
          </button>
        </div>

        {/* user action buttons */}
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center w-full px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
            id="menu-button"
            aria-label="login or signup"
            aria-controls="authentication menu"
            onClick={handleAccountIconClick}
            aria-haspopup="true"
          >
            <UserCircleIcon className="h-6 text-[#800000] dark:text-[#D7DADC]" />

            <ChevronDownIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
          </button>
          <Menu
            id="authentication menu"
            elevation={0}
            getContentAnchorEl={null}
            anchorEl={accountIconAnchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(accountIconAnchorEl)}
            onClose={handleAccountIconClose}
          >
            <MenuItem onClick={handleAccountIconClose} disableGutters>
              <button className="text-[#800000] dark:text-[#D7DADC] font-bold text-sm border rounded-md uppercase ml-3 px-4 py-0  tracking-wide">
                Login
              </button>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleAccountIconClose} disableGutters>
              <button className="text-[#fafafa] dark:text-[#D7DADC] font-bold text-sm border rounded-md uppercase ml-3 px-4 py-0 bg-[#933a16] dark:bg-gray-500">
                Signup
              </button>
            </MenuItem>
            <Divider />

            <MenuItem disableGutters>
              <div className="flex space-x-5 ml-3">
                <span className="flex items-center justify-center space-x-1">
                  <MoonIcon className="h-5" />
                  <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                    Dark Mode
                  </p>
                </span>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChanger}
                  size="small"
                />
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* sidebar pop-out button */}
        <div className="ml-4">
          <button
            type="button"
            className="inline-flex w-full lg:hidden px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
          >
            <ChevronDoubleLeftIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
