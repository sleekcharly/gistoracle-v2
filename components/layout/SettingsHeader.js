import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { LogoutIcon, MenuIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function SettingsHeader({ logout, currentUser, credentials }) {
  // define router
  const router = useRouter();

  // check if user is loged in or redirect to home page
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      !currentUser && router.push("/");
    }

    return () => (mounted = false);
  }, []);

  // define component state
  const [anchorEl, setAnchorEl] = useState(null);

  //handle Menu anchor
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle closing of menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // handler for calling the logout function
  const handleLogout = async () => {
    try {
      console.log("user is logged out");

      await logout();
      router.push("/");
    } catch {
      console.log("Failed to logout");
    }
  };

  return (
    <div className="sticky top-0 z-[1000] py-2 px-2 lg:px-3 lg:py-1 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between w-full lg:w-[75%] lg:mr-auto lg:ml-auto">
        <NextLink href="/" passHref>
          <div className="relative w-[75px] h-[35px] lg:w-[100px] lg:h-[40px] cursor-pointer">
            <Image
              src="/images/gistoracle_logo.png"
              alt="Gist oracle logo"
              layout="fill"
              quality="100"
              component="link"
            />
          </div>
        </NextLink>

        {/* use r avartar and menu section */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <Avatar alt={credentials.username} src={credentials.imageUrl} />
          <button
            className="hidden md:flex items-center space-x-1 text-[#933a16] p-1 hover:bg-[#fcf6f5] rounded-md transition-all"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <p className="font-semibold text-base">Profile</p>
            <ArrowDropDown />
          </button>

          <div
            className="flex md:hidden text-[#933a16]"
            component="button"
            onClick={handleMenuClick}
          >
            <MenuIcon className="h-5" />
          </div>

          <Menu
            id="profile-menu"
            elevation={0}
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <div className="text-[#933a16] flex items-center text-sm md:text-base space-x-1">
                <LogoutIcon className="h-5" />
                <p>Logout</p>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default SettingsHeader;
