function CreateShrinePost({ shrineName, component }) {
  return (
    <div className="text-center mb-3">
      <button
        onClick={() => {
          window.location.href = `/createPost/${shrineName}`;
        }}
        className="text-sm  2xl:text-base text-gray-700 font-semibold bg-[#ccc8c8] rounded-md py-1 px-2 uppercase"
      >
        {component === "shrineInfo" ? "Create post 🤠" : "Create one then 🤠"}
      </button>
    </div>
  );
}

export default CreateShrinePost;
