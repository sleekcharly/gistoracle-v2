import { useAuth } from "../../contexts/AuthContext";
import CreateShrine from "./CreateShrine";

function NewShrine() {
  // get currentUser
  const { currentUser } = useAuth();

  return (
    <div className={`${!currentUser && "hidden"} bg-white rounded-sm`}>
      <div>
        {/* hero image */}
        <div className="relative">
          <img
            alt="Shrine hero image"
            src="/images/shrinebackground.png"
            className="w-full h-24 object-cover"
          />
          <img
            alt="idea"
            src="/images/idea.png"
            className="absolute top-[40%] left-[35%] w-20 h-20 lg:w-24 lg:h-24"
          />
        </div>

        {/* text */}
        <div className="text-center mt-16 mb-2">
          <p className="text-gray-700">Have a great idea for a new shrine?</p>
        </div>

        {/* create button */}
        <div className="text-center mb-3">
          <CreateShrine />
        </div>
      </div>
    </div>
  );
}

export default NewShrine;
