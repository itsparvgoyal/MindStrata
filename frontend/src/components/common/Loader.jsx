const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b]/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-2 border-[#22222c]"></div>
        <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-transparent border-t-white border-r-indigo-400"></div>
      </div>
      <span className="text-xs font-semibold tracking-wider text-gray-400 mt-4 uppercase">
        Loading...
      </span>
    </div>
  );
};

export default Loader;