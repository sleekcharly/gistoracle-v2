import { Divider } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

function CatPageTopShrines() {
  // set component states
  const [category, setCategory] = useState(null);
  const [topShrines, setTopShrines] = useState([]);
  const [loadingShrines, setLoadingShrines] = useState(false);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        catData: state.data.category,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { catData } = useStateParameters();

  // set category to component state
  useEffect(() => {
    // subscribe
    let mounted = true;

    // set category state
    if (mounted) setCategory(catData);

    // end subscription
    return () => (mounted = false);
  }, [catData]);

  // get top shrines
  useEffect(() => {
    // subscribe
    let mounted = true;

    // set loading state
    setLoadingShrines(true);

    // get and store top 5 category shrines in component state
    category &&
      axios
        .get(`/api/shrine/getTopCategoryShrines/${category.categoryId}`)
        .then((res) => {
          if (mounted) setTopShrines(res.data);
          setLoadingShrines(false);
        })
        .catch((err) => {
          console.error(err);
        });

    return () => (mounted = false);
  }, [category]);

  return loadingShrines ? (
    <SidebarSkeleton />
  ) : (
    <div className="bg-white">
      {/* title */}
      <div className="bg-[#933a16] h-12 rounded-tl-sm rounded-tr-sm p-2 relative">
        <p className="text-sm font-semibold absolute bottom-2 left-2 capitalize">
          Top {category && category.name} Shrines
        </p>
      </div>

      {/* content */}
      <div>
        {topShrines &&
          topShrines.map((shrine, i) => (
            <>
              <div key={shrine.shrineId}>
                <div className="p-2 flex items-center space-x-2 xl:space-x-3">
                  <span className="flex items-center space-x-1">
                    <TrendingUp fontSize="small" color="secondary" />
                    <a href={`/shrine/${shrine.name}`}>
                      <img
                        src={
                          shrine.avatar
                            ? shrine.avatar
                            : "/images/shrineAvatar.png"
                        }
                        alt={shrine.name}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full"
                      />
                    </a>
                  </span>

                  {/* shrine name */}
                  <a href={`/shrine/${shrine.name}`}>
                    <p className="text-gray-700 text-xs xl:text-sm">
                      {shrine.name}
                    </p>
                  </a>
                </div>
              </div>
              <Divider />
            </>
          ))}
      </div>
    </div>
  );
}

export default CatPageTopShrines;
