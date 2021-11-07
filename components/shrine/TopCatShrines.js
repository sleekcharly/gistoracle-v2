import { TrendingUp } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

function TopCatShrines() {
  // set component states
  const [category, setCategory] = useState(null);
  const [topShrines, setTopShrines] = useState([]);
  const [loadingShrines, setLoadingShrines] = useState(false);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        featuredNavCategories: state.UI.featuredNavCategories,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { featuredNavCategories } = useStateParameters();

  // get a random category
  useEffect(() => {
    // subscribe
    let mounted = true;

    let category =
      featuredNavCategories &&
      featuredNavCategories[
        Math.floor(Math.random() * featuredNavCategories.length)
      ];

    if (mounted) setCategory(category);

    return () => (mounted = false);
  }, [featuredNavCategories]);

  //   get top category shrines
  useEffect(() => {
    // subscribe
    let mounted = true;

    // define loading state
    setLoadingShrines(true);

    // get and store top 5 category shrines in component state
    category &&
      axios
        .get(
          `/api/shrine/getTopCategoryShrines/${category.featuredNavCategoryId}`
        )
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
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
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

export default TopCatShrines;
