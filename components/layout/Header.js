import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Menu from "@material-ui/core/Menu";
import { MenuIcon, SearchIcon } from "@heroicons/react/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  PencilAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Data from "../../utils/data";
import { Link, MenuItem } from "@material-ui/core";

function Header({ featuredNavCategories }) {
  // desktop more nav categories from data
  const desktopNavCategories = Data.navCategories.slice(7);

  // define state parameters
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [iconAnchorEl, setIconAnchorEl] = React.useState(null);

  //open more menu
  const handleMoreButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // close more menu
  const handleMoreClose = () => {
    setAnchorEl(null);
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
          className="w-[70px] lg:w-[100px] lg:h-[40px]"
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
                className="divide-y divide-gray-100 "
              >
                <NextLink
                  href={`/category/${mobileMenuCategory.name}`}
                  passHref
                >
                  <p className="uppercase font-medium text-xs">
                    {mobileMenuCategory.name}
                  </p>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-5 xl:space-x-8 ml-10">
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
              <span className="text-[#800000] dark:text-[#D7DADC] uppercase font-medium text-sm">
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
                  className="divide-y divide-gray-100 "
                >
                  <NextLink
                    href={`/category/${navMenuListCategory.name}`}
                    passHref
                  >
                    <p className="uppercase font-medium text-sm text-center text-[#800000] dark:text-black">
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
      <div className="hidden lg:flex ml-2 items-center rounded-full bg-gray-100 p-2 text-[#800000] flex-grow">
        <SearchIcon className="h-6 text-gray-400" />
        <input
          className="hidden md:inline-flex  ml-2 items-center bg-transparent outline-none placeholder-gray-300 w-full"
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

        {/* user action buttons */}
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center w-full lg:hidden px-2 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <UserCircleIcon className="h-6 text-[#800000] dark:text-[#D7DADC]" />

            <ChevronDownIcon className="h-4 text-[#800000] dark:text-[#D7DADC]" />
          </button>
        </div>

        {/* logged in user options button */}
        <div className="hidden lg:flex justify-between items-center cursor-pointer border border-[#800000] dark:border-gray-400 border-opacity-20 rounded-full px-3 py-2 space-x-8 w-full hover:bg-red-50 dark:hover:bg-gray-800 group">
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

        {/* large screen authentication buttons */}
        <div className="hidden md:flex items-center space-x-6 ml-6">
          <button className="text-[#800000] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 hover:bg-gray-100 dark:hover:text-black tracking-wide transition duration-200">
            Login
          </button>

          <button className="text-[#fafafa] dark:text-[#D7DADC] font-bold border rounded-md uppercase px-4 py-0 bg-[#933a16] dark:bg-gray-500 dark:hover:bg-[#800000] dark:hover:text-white">
            Signup
          </button>
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
