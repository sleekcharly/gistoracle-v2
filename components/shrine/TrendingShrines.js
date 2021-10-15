import axios from "axios";
import numeral from "numeral";
import { useEffect, useState } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

function TrendingShrines() {
  // set component state
  const [trendingShrines, setTrendingShrines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get trending shrines
  useEffect(() => {
    // subscribe
    let mounted = true;

    setLoading(true);

    axios
      .get("/api/shrine/topFollowedShrines")
      .then((res) => {
        if (mounted) setTrendingShrines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

    // close subscription
    return () => (mounted = false);
  }, []);

  return loading ? (
    <SidebarSkeleton />
  ) : (
    <div className="bg-white p-2 rounded-sm">
      <p className=" text-gray-700 text-sm font-semibold capitalize mb-5">
        Most Followed Shrines
      </p>

      <div>
        {trendingShrines &&
          trendingShrines.map((shrine, i) => (
            <div
              key={shrine.shrineId}
              className="mb-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-1">
                <img
                  src={
                    shrine.avatar ? shrine.avatar : "/images/shrineAvatar.png"
                  }
                  alt={`${shrine.name} shrine`}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full"
                />
                <div>
                  <p className="text-xs md:text-sm text-gray-700">
                    {shrine.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    {numeral(shrine.followers).format("0a")}{" "}
                    {shrine.followers > 1 ? "followers" : "follower"}
                  </p>
                </div>
              </div>

              {/* button */}
              <a href={`/shrine/${shrine.name}`}>
                <button className="bg-[#933a16] text-white text-xs md:text-sm py-1 px-2 rounded-md hover:bg-[#800000] transition-all">
                  Explore
                </button>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TrendingShrines;
