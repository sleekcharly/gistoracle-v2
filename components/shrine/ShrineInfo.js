import { CakeOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import { shallowEqual, useSelector } from "react-redux";
import CreateShrinePost from "../post/CreateShrinePost";
import EditShrine from "./EditShrine";

function ShrineInfo({ component }) {
  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        shrine: state.data.shrine,
        user: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { shrine, user } = useStateParameters();

  return (
    <div className="relative bg-white rounded-md">
      {/* header */}
      <div className="text-white bg-[#cf5323] p-3 rounded-t-md">
        <p className="font-semibold text-base xl:text-lg" component="h1">
          About Shrine
        </p>
      </div>

      {/* avatar and name */}
      <div className="flex items-center space-x-2 xl:space-x-3 p-2 xl:p-3 mb-2">
        <img
          src={shrine.avatar ? shrine.avatar : "/images/shrineAvatar.png"}
          alt={shrine.name}
          className="w-12 h-12 xl:w-20 xl:h-20 rounded-full object-cover"
        />

        <p className="text-gray-700 font-semibold text-sm xl:text-lg">
          {shrine.name}
        </p>
      </div>

      {/* conditional display of shrine description */}
      {shrine.description && (
        <div className="p-2 xl:p-3 mb-2">
          <p className="text-gray-700 text-sm">{shrine.description}</p>
        </div>
      )}

      {/* shrine meta data */}
      <div className="flex items-center justify-between p-2 xl:p-3 mb-2">
        <div>
          <p className="text-gray-700 font-semibold text-sm">
            {shrine.followers}
          </p>
          <p className="text-gray-700 text-sm">
            {shrine.followers === 1 ? "Follower" : "Followers"}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          <CakeOutlined color="secondary" fontSize="small" />
          <div>
            <p className="text-gray-700 text-sm">Consecrated</p>
            <p className="text-gray-700 font-semibold text-sm">
              {dayjs(shrine.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* create post button */}
      {component === "createPost" ? null : (
        <CreateShrinePost component={component} shrineName={shrine.name} />
      )}

      {/* edit shrine button to open edit shrine dialog */}
      {shrine.creator === user.username ? (
        <div className="absolute top-[3%] right-[2%] lg:top-[2%] lg:right-[2%]">
          <EditShrine shrine={shrine} />
        </div>
      ) : null}
    </div>
  );
}

export default ShrineInfo;
