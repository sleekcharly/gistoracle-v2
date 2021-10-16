import React from "react";
import NewShrine from "../shrine/NewShrine";
import TopCatShrines from "../shrine/TopCatShrines";
import TrendingShrines from "../shrine/TrendingShrines";
import TopOracles from "../user/TopOracles";
import Footer from "./Footer";

function AppSidebar() {
  // go back to top function
  const handleBackToTopClick = () => {
    window.scrollTo(0, 0);
  };

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

        {/* create new shrine component */}
        <NewShrine />

        {/* ad */}
        <a
          href="https://chat.whatsapp.com/ITfKMi2Xuxf6ytiUNfjPEf"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/ads/juchag_fashion.jpg"
            alt="Juchag fashion ad"
            className="w-full h-auto rounded-sm"
          />
        </a>

        {/* footer */}
        <Footer />

        {/* back to top button */}
        <div className="text-center">
          <button
            className="text-sm text-white bg-[#933a16] py-1 px-2 rounded-md mt-5"
            onClick={handleBackToTopClick}
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppSidebar;
