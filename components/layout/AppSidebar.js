import React from "react";
import TopCatShrines from "../shrine/TopCatShrines";
import TrendingShrines from "../shrine/TrendingShrines";
import TopOracles from "../user/TopOracles";

function AppSidebar() {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        {/*  top category shrines */}
        <TopCatShrines />

        {/* ad */}
        <a
          href="http://pingtelecoms.net/birdcontrol.php"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/ads/pingtel_ad.jpg"
            alt="Pingtel bird control ad"
            className="w-full h-auto rounded-sm"
          />
        </a>

        {/* trending shrines */}
        <TrendingShrines />

        {/* top oracles */}
        <TopOracles />
      </div>
    </div>
  );
}

export default AppSidebar;
