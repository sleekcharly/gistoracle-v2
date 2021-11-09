import { Divider } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

function TopOracles() {
  // set component state
  const [topOracles, setTopOracles] = useState([]);
  const [loading, setLoading] = useState(false);

  // get top oracles
  useEffect(() => {
    // subscribe
    let mounted = true;

    setLoading(true);

    axios
      .get("/api/user/data/getTopOracles")
      .then((res) => {
        if (mounted) setTopOracles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });

    return () => (mounted = false);
  }, []);

  return loading ? (
    <SidebarSkeleton />
  ) : (
    <div className="bg-white">
      {/* title */}
      <div className="bg-[#933a16] h-12 rounded-tl-sm rounded-tr-sm p-2 relative">
        <p className="text-sm font-semibold absolute bottom-2 left-2">
          Top Oracles
        </p>
      </div>

      {/* content */}
      <div>
        {topOracles &&
          topOracles.map((oracle, i) => (
            <div key={oracle.userId}>
              <a
                href={`/user/${oracle.username}`}
                className="flex items-center space-x-2 xl:space-x-10 p-3"
              >
                <img
                  src={oracle.imageUrl}
                  alt={
                    oracle.displayName ? oracle.displayName : oracle.username
                  }
                  className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full object-cover"
                />

                <p className="text-gray-700 text-sm font-semibold">
                  {oracle.username}
                </p>
              </a>
              <Divider />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TopOracles;
