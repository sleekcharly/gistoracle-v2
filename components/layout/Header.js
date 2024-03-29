import React, { useEffect } from "react";
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
  CubeTransparentIcon,
  PencilAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Data from "../../utils/data";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Link,
  MenuItem,
  Switch,
} from "@material-ui/core";
import { useTheme } from "next-themes";
import Login from "../auth/login";
import { useAuth } from "../../contexts/AuthContext";

// redux stuff
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
  DARK_MODE_OFF,
  DARK_MODE_ON,
} from "../../redux/types/uiTypes";
import { useSnackbar } from "notistack";
import algoliasearch from "algoliasearch";
import Signup from "../auth/signup";
import { ChevronRight } from "@material-ui/icons";
import AppSidebar from "./AppSidebar";
import MyButton from "../MyButton";

function Header({
  featuredNavCategories,
  pageComponent,
  drawerPage,
  categoryId,
  username,
}) {
  // *** get redux state parameters ***//
  // get server-side rendered darkmode state and UI status from redux state
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        darkMode: state.UI.darkMode,
        credentials: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { darkMode, credentials } = useStateParameters();

  // define dispatch
  const dispatch = useDispatch();

  // get login function from auth context
  const { login, logout, currentUser } = useAuth();

  // set highlidht for signup component
  const highlight =
    "Owning a Gist Oracle account gives you the opportunity to be heard and equipped with power to shake up your favourite shrines.";

  // Change theme handler
  const { systemTheme, theme, setTheme } = useTheme();
  const darkModeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    dispatch({
      type: currentTheme === "dark" ? DARK_MODE_OFF : DARK_MODE_ON,
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
  const desktopNavCategories = Data.navCategories.slice(6);

  // define state parameters
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [iconAnchorEl, setIconAnchorEl] = React.useState(null);
  const [accountIconAnchorEl, setAccountIconAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(null);
  const [openSidebar, setOpenSidebar] = React.useState(false);

  // define algolia variables for full text search
  const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
  const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, {
    protocol: "https:",
  });
  let index = client.initIndex(ALGOLIA_INDEX_NAME);

  // handle search with algolia
  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);

    //perform algolia operation
    await index
      .search(searchQuery)
      .then((data) => {
        setSearchResults(data.hits);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // open login dialog
  const handleLoginClickOpen = () => {
    dispatch({ type: CLEAR_LOGIN_ERRORS });
    setOpenLogin(true);
    setOpenSignup(false);
  };
  // close login dialog
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  // open signup dialog
  const handleSignupClickOpen = () => {
    dispatch({ type: CLEAR_SIGNUP_ERRORS });
    setOpenSignup(true);
    setOpenLogin(false);
  };

  // close signup dialog
  const handleSignupClose = () => {
    setOpenSignup(false);
  };

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

  // handler for calling the logout function
  const handleLogout = async () => {
    try {
      console.log("user is logged out");

      await logout();
    } catch {
      console.log("Failed to logout");
    }
  };

  // handle Opening of sidebar drawer
  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  // handle Closing sidebar drawer
  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  // handle error from images
  const addDefaultSrc = (ev) => {
    ev.target.src = "/images/post-thumbnail-placeholder.png";
  };

  return (
    <div className="sticky top-0 z-[1000] flex items-center bg-white py-2 px-2 lg:px-3 lg:py-1 shadow-lg dark:bg-gray-800 ">
      {/* Gist oracle logo */}
      <a href="/">
        <div className="relative w-[75px] h-[35px] lg:w-[100px] lg:h-[40px] cursor-pointer">
          <Image
            src="/images/gistoracle_logo.png"
            alt="Gist oracle logo"
            layout="fill"
            quality="100"
            component="link"
          />
        </div>
      </a>

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
                <a href={`/category/${mobileMenuCategory.name}`}>
                  <p className="uppercase font-medium text-xs dark:text-white">
                    {mobileMenuCategory.name}
                  </p>
                </a>
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
                  <a href={`/category/${navMenuListCategory.name}`}>
                    <p className="uppercase font-medium text-xs text-center text-[#800000] dark:text-white">
                      {navMenuListCategory.name}
                    </p>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </nav>

      {/* Search bar area */}
      <div className="hidden md:flex flex-grow relative">
        <div className="flex ml-2 items-center rounded-full bg-gray-100 dark:bg-gray-600 p-2 text-[#800000] dark:text-gray-400 w-full">
          <SearchIcon className="h-6 text-gray-400 dark:text-gray-500" />
          <input
            className="hidden md:inline-flex  ml-2 items-center bg-transparent outline-none placeholder-gray-300 dark:placeholder-gray-500 w-full"
            type="text"
            placeholder="Search Gistoracle"
            aria-label="Search"
            aria-controls="search-menu"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* search results */}
        <div
          hidden={searchResults ? false : true}
          className="absolute top-10 w-full max-h-[472px] overflow-y-scroll bg-white dark:bg-gray-800 scrollbar-hide dark:border border-gray-600"
        >
          {searchQuery &&
            searchResults &&
            searchResults.map((result) => (
              <>
                <div
                  className="p-3 hover:bg-[#f5f0f0] dark:hover:bg-gray-500 cursor-pointer relative"
                  key={result.objectID}
                >
                  <NextLink
                    href={`/post/${result.shrineName}/${result.objectID}/${result.slug}`}
                    passHref
                  >
                    <div className="p-2 mb-2 flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <CubeTransparentIcon className="h-3 text-[#800000] dark:text-[#D7DADC]" />
                          <p className="text-[#800000] dark:text-white font-medium text-xs">
                            {result.shrineName}
                          </p>
                        </div>

                        <p className="mt-2 mr-0 mb-2 ml-3 pr-2 text-sm overflow-hidden overflow-ellipsis text-gray-800 dark:text-white font-semibold">
                          {result.title}
                        </p>

                        <p className="text-[#800000] dark:text-white font-medium text-xs">
                          @{result.username}
                        </p>
                      </div>

                      <img
                        onError={addDefaultSrc}
                        src={result.postThumbnail}
                        alt={result.title}
                        width="70px"
                        height="70px"
                        className="object-contain rounded-md"
                      />
                    </div>
                  </NextLink>
                </div>
                <Divider />
              </>
            ))}
          {/* algolia image */}
          <img
            src="/images/algolia-blue-mark.svg"
            width={20}
            height={20}
            className="w-[20px] h-[20px] absolute top-[1px] right-[1px]"
          />
        </div>
      </div>

      {/* header action areas */}
      <div className="flex items-center ml-auto">
        {/* create post button */}
        {currentUser && (
          <a
            className="inline-flex justify-center w-full bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer"
            href="/post/new"
          >
            <MyButton tip="Create post">
              <PencilAltIcon className="h-6 text-[#800000] dark:text-[#D7DADC]" />
            </MyButton>
          </a>
        )}

        {/* logged in user options button */}
        {currentUser && (
          <div className="hidden lg:flex ">
            <div
              component="button"
              className="flex items-center cursor-pointer border border-[#800000] dark:border-gray-400 border-opacity-20 rounded-full px-3 py-2 space-x-2 w-full hover:bg-red-50 dark:hover:bg-gray-800 group h-auto"
              id="user-menu-button"
              aria-label="logged in user menu"
              aria-controls="user menu"
              onClick={handleUserMenuClick}
              aria-haspopup="true"
            >
              {/* login user profile pic */}

              <Avatar
                alt={credentials.username}
                src={credentials.imageUrl}
                style={{ height: "30px", width: "30px" }}
              />

              <div className="text-[#800000] text-xs  font-medium dark:text-[#D7DADC] w-[110px] flex flex-col text-left">
                <p className="mb-1">{credentials.username}</p>
                <div className="flex items-center space-x-1 w-full">
                  <SparklesIcon className="h-3 text-[#800000] dark:text-[#D7DADC] " />
                  <p className="flex items-center">
                    {credentials.vibrations
                      ? Math.round(credentials.vibrations)
                      : null}{" "}
                    {credentials.vibrations > 1.5 ? "vibes" : "vibe"}
                  </p>
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
                  <NextLink href={`/user/${credentials.username}`} passHref>
                    <span className="flex items-center justify-center space-x-1">
                      <UserIcon className="h-5" />
                      <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                        My Profile
                      </p>
                    </span>
                  </NextLink>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem disableGutters>
                <div className="flex  ml-3">
                  <NextLink href="/user/settings" passHref>
                    <span className="flex items-center justify-center space-x-1">
                      <CogIcon className="h-5" />
                      <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                        UserSettings
                      </p>
                    </span>
                  </NextLink>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem disableGutters onClick={handleLogout}>
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

              {/* <MenuItem disableGutters>
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
              </MenuItem> */}
            </Menu>
          </div>
        )}

        {/* large screen authentication buttons */}
        {!currentUser && (
          <div className="hidden md:flex items-center space-x-6 ml-6">
            <button
              className="text-[#800000] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 hover:bg-gray-100 dark:hover:text-black tracking-wide transition duration-200"
              onClick={handleLoginClickOpen}
            >
              Login
            </button>

            <button
              className="text-[#fafafa] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 bg-[#933a16] dark:bg-gray-500 dark:hover:bg-[#800000] dark:hover:text-white"
              onClick={handleSignupClickOpen}
            >
              Signup
            </button>
          </div>
        )}

        {/* user action buttons when non authenticated */}
        {!currentUser && (
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
                <button
                  className="text-[#800000] dark:text-[#D7DADC] font-bold text-sm border rounded-md uppercase ml-3 px-4 py-0  tracking-wide"
                  onClick={handleLoginClickOpen}
                >
                  Login
                </button>
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleAccountIconClose} disableGutters>
                <button
                  className="text-[#fafafa] dark:text-[#D7DADC] font-bold text-sm border rounded-md uppercase ml-3 px-4 py-0 bg-[#933a16] dark:bg-gray-500"
                  onClick={handleSignupClickOpen}
                >
                  Signup
                </button>
              </MenuItem>
              <Divider />

              {/* <MenuItem disableGutters>
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
              </MenuItem> */}
            </Menu>
          </div>
        )}

        {/* user action buttons when authenticated for mobile devices */}
        {currentUser && (
          <div className="block lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
              id="menu-button"
              aria-label="login or signup"
              aria-controls="authentication menu"
              onClick={handleUserMenuClick}
              aria-haspopup="true"
            >
              <Avatar
                alt={credentials.username}
                src={credentials.imageUrl}
                style={{ width: "30px", height: "30px" }}
              />

              <ChevronDownIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
            </button>
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
                  <NextLink href={`/user/${credentials.username}`} passHref>
                    <span className="flex items-center justify-center space-x-1">
                      <UserIcon className="h-5" />
                      <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                        My Profile
                      </p>
                    </span>
                  </NextLink>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem disableGutters>
                <div className="flex  ml-3">
                  <NextLink href="/user/settings" passHref>
                    <span className="flex items-center justify-center space-x-1">
                      <CogIcon className="h-5" />
                      <p className="text-sm font-medium text-[#800000] dark:text-[#D7DADC]">
                        UserSettings
                      </p>
                    </span>
                  </NextLink>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem disableGutters onClick={handleLogout}>
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

              {/* <MenuItem disableGutters>
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
              </MenuItem> */}
            </Menu>{" "}
          </div>
        )}

        {/* sidebar pop-out button */}
        {pageComponent === "createPost" ? null : (
          <div className="ml-4">
            <button
              type="button"
              className="inline-flex w-full lg:hidden px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
              onClick={handleDrawerOpen}
              ari-label="open sidebar"
            >
              <ChevronDoubleLeftIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
            </button>

            <Drawer anchor="right" open={openSidebar}>
              <div className="md:w-[320px]">
                <div className="bg-[#933a16] fixed z-10 w-full h-[50px] pl-2">
                  <button
                    onClick={handleDrawerClose}
                    className="bg-white mt-1 rounded-full p-1"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {/* sidebar content */}
                <div className="mt-10">
                  <AppSidebar
                    page={drawerPage}
                    categoryId={categoryId ? categoryId : null}
                    username={username ? username : null}
                    drawer={true}
                  />
                </div>
              </div>
            </Drawer>
          </div>
        )}
      </div>

      <Login
        openLogin={openLogin}
        handleLoginClose={handleLoginClose}
        handleSignupClickOpen={handleSignupClickOpen}
        setOpenLogin={setOpenLogin}
        login={login}
      />

      <Signup
        openSignup={openSignup}
        handleLoginClickOpen={handleLoginClickOpen}
        handleSignupClose={handleSignupClose}
        highlight={highlight}
      />
    </div>
  );
}

export default Header;
