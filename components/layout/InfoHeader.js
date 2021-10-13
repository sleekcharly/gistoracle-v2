import React, { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

function InfoHeader({ page }) {
  //define component state
  const [anchorEl, setAnchorEl] = useState(null);

  // handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sticky top-0 z-[1000] flex items-center bg-white py-2 px-2 lg:px-3 lg:py-1 shadow-lg">
      <NextLink href="/" passHref>
        <div className="relative w-[75px] h-[35px] lg:w-[100px] lg:h-[40px] cursor-pointer md:mr-12 xl:mr-14">
          <Image
            src="/images/gistoracle_logo.png"
            alt="Gist oracle logo"
            layout="fill"
            quality="100"
            component="link"
          />
        </div>
      </NextLink>

      {/* empty space for flex grow on mobile */}
      <div className="flex-grow md:hidden"></div>

      {/* tablet and desktop navigation */}
      <div className="hidden md:flex md:items-center md:space-x-10 xl:space-x-12">
        <a
          className="flex cursor-pointer space-x-2 items-center group"
          href="/about"
        >
          <span
            className={`relative uppercase font-bold ${
              page === "about"
                ? "text-[#800000] before:bg-[#800000]"
                : "text-gray-500 before:bg-gray-500"
            } dark:text-[#D7DADC]  dark:before:bg-[#f9f9f9] before:rounded-bl before:-bottom-1.5 before:h-0.5 before:inset-x-0 before:absolute before:transform before:origin-left before:scale-x-0 before:transition-all before:duration-200 group-hover:before:scale-x-100`}
          >
            about
          </span>
        </a>
        <a
          className="flex cursor-pointer space-x-2 items-center group"
          href="/terms"
        >
          <span
            className={`relative uppercase font-bold ${
              page === "terms"
                ? "text-[#800000] before:bg-[#800000]"
                : "text-gray-500 before:bg-gray-500"
            } dark:text-[#D7DADC]  dark:before:bg-[#f9f9f9] before:rounded-bl before:-bottom-1.5 before:h-0.5 before:inset-x-0 before:absolute before:transform before:origin-left before:scale-x-0 before:transition-all before:duration-200 group-hover:before:scale-x-100`}
          >
            terms
          </span>
        </a>
        <a
          className="flex cursor-pointer space-x-2 items-center group"
          href="/privacy"
        >
          <span
            className={`relative uppercase font-bold ${
              page === "privacy"
                ? "text-[#800000] before:bg-[#800000]"
                : "text-gray-500 before:bg-gray-500"
            } dark:text-[#D7DADC]  dark:before:bg-[#f9f9f9] before:rounded-bl before:-bottom-1.5 before:h-0.5 before:inset-x-0 before:absolute before:transform before:origin-left before:scale-x-0 before:transition-all before:duration-200 group-hover:before:scale-x-100`}
          >
            privacy policy
          </span>
        </a>
        <a
          className="flex cursor-pointer space-x-2 items-center group"
          href="/contentpolicy"
        >
          <span
            className={`relative uppercase font-bold ${
              page === "contentpolicy"
                ? "text-[#800000] before:bg-[#800000]"
                : "text-gray-500 before:bg-gray-500"
            } dark:text-[#D7DADC]  dark:before:bg-[#f9f9f9] before:rounded-bl before:-bottom-1.5 before:h-0.5 before:inset-x-0 before:absolute before:transform before:origin-left before:scale-x-0 before:transition-all before:duration-200 group-hover:before:scale-x-100`}
          >
            content policy
          </span>
        </a>
      </div>

      {/* mobile navigation */}
      <div className="md:hidden">
        <IconButton
          aria-label="Navigation menu"
          aria-controls="navigation menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="navigation-menu"
          anchorEl={anchorEl}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className="divide-y divide-gray-100 dark:divide-gray-500 ">
            <a
              className={`${
                page === "about" ? "text-[#800000]" : "text-gray-500"
              } text-xs`}
              href="/about"
            >
              ABOUT
            </a>
          </MenuItem>
          <MenuItem className="divide-y divide-gray-100 dark:divide-gray-500 ">
            <a
              className={`${
                page === "terms" ? "text-[#800000]" : "text-gray-500"
              } text-xs`}
              href="/terms"
            >
              TERMS
            </a>
          </MenuItem>
          <MenuItem className="divide-y divide-gray-100 dark:divide-gray-500 ">
            <a
              className={`${
                page === "privacy" ? "text-[#800000]" : "text-gray-500"
              } text-xs`}
              href="/privacy"
            >
              PRIVACY
            </a>
          </MenuItem>
          <MenuItem className="divide-y divide-gray-100 dark:divide-gray-500 ">
            <a
              className={`${
                page === "contentpolicy" ? "text-[#800000]" : "text-gray-500"
              } text-xs`}
              href="/contentpolicy"
            >
              CONTENT POLICY
            </a>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default InfoHeader;
