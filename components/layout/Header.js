import React from "react";
import Image from "next/image";
import NextLink from "next/Link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Link } from "@material-ui/core";
// import logo from "../../public/images/gistoracle_logo.png";

function Header() {
  return (
    <header className="static top-0 z-[1000] flex items-center bg-white py-2 px-2 lg:px-3 lg:py-3 shadow-lg dark:bg-gray-800">
      {/* Gist oracle logo */}
      <NextLink href="/" passHref>
        <Link>
          <img
            src="/images/gistoracle_logo.png"
            className="w-[70px] lg:w-[100px] lg:h-[40px]"
            alt="Gist oracle logo"
          />
        </Link>
      </NextLink>

      <nav></nav>
    </header>
  );
}

export default Header;
