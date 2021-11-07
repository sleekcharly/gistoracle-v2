import React from "react";
import CatPageTopShrines from "../shrine/catPageTopCatShrines";
import NewShrine from "../shrine/NewShrine";
import ShrineInfo from "../shrine/ShrineInfo";
import TopCatShrines from "../shrine/TopCatShrines";
import TrendingShrines from "../shrine/TrendingShrines";
import TopOracles from "../user/TopOracles";
import UserProfile from "../user/UserProfile";
import Footer from "./Footer";

function AppSidebar({ page, categoryId, username, drawer }) {
  // go back to top function
  const handleBackToTopClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="flex flex-col space-y-3">
        {/*  top category shrines */}
        {page === "home" && <TopCatShrines />}

        {/* top category shrines for category page */}
        {page === "category" && <CatPageTopShrines categoryId={categoryId} />}

        {/* shrine info */}
        {page === "shrine" && <ShrineInfo component="shrineInfo" />}
        {page === "post" && <ShrineInfo component="post" />}

        {/* ad */}
        {(page === "home" ||
          page === "category" ||
          page === "shrine" ||
          page === "post") && (
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
        )}

        {/*  */}
        {page === "shrine" && <TopCatShrines />}

        {/* trending shrines */}
        {(page === "home" ||
          page === "category" ||
          page === "shrine" ||
          page === "post") && <TrendingShrines />}

        {/* top oracles */}
        {(page === "home" || page === "category" || page === "shrine") && (
          <TopOracles />
        )}

        {/* user profile */}
        {page === "user" && <UserProfile username={username} />}

        {/* create new shrine component */}
        {page !== "post" && <NewShrine />}

        {/* ad */}
        {page === "user" && (
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
        )}

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
        {drawer ? null : (
          <div className="text-center">
            <button
              className="text-sm text-white bg-[#933a16] py-1 px-2 rounded-md mt-5"
              onClick={handleBackToTopClick}
            >
              Back to top
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppSidebar;
