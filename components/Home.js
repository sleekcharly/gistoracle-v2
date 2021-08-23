import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";

function HomeComponent() {
  // set material-ui theme
  const theme = useTheme();

  // define media query variables for tablets and desktops
  // const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  // const miniTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const proTablets = useMediaQuery(theme.breakpoints.up("md"));
  // const dektops = useMediaQuery(theme.breakpoints.up("lg"));

  // define state parameters
  const [buttonClicked, setButtonClicked] = useState("new");

  return (
    <div>
      {/* filter navigation buttons */}
      <div className="flex p-[5px] bg-white dark:bg-gray-800 mb-[2px] items-center justify-center md:justify-start mt-0 lg:mt-1 dark:border dark:border-gray-400 dark:border-opacity-20 rounded-xl lg:mb-1">
        <span
          className={`ml-2 mr-5 ${
            buttonClicked === "new" &&
            "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
          } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
        >
          <NewspaperIcon className="h-4 text-[#800000] dark:text-white" />
          <p className="text-[#e60000] dark:text-white font-semibold">New</p>
        </span>

        <span
          className={`ml-2 mr-5 ${
            buttonClicked === "spicy" &&
            "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
          } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
        >
          <FireIcon className="h-4 text-[#800000] dark:text-white" />
          <p className="text-[#e60000] dark:text-white font-semibold">Spicy</p>
        </span>

        <span
          className={`ml-2 mr-5 ${
            buttonClicked === "top" &&
            "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
          } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
        >
          <TrendingUpIcon className="h-4 text-[#800000] dark:text-white" />
          <p className="text-[#e60000] dark:text-white font-semibold">Top</p>
        </span>
      </div>
    </div>
  );
}

export default HomeComponent;
