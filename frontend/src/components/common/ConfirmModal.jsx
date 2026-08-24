const ConfirmModal = ({
  modalData,
}) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-[#09090b]/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[380px] rounded-2xl border border-[#22222c] bg-[#121217] p-6 sm:p-7 shadow-2xl">

        <h2 className="text-xl font-extrabold text-white tracking-tight">
          {modalData?.text1}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
          {modalData?.text2}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={modalData?.btn2Handler}
            className="rounded-full bg-[#181820] border border-[#2a2a34] px-5 py-2 text-xs font-semibold text-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
          >
            {modalData?.btn2Text || "Cancel"}
          </button>

          <button
            onClick={modalData?.btn1Handler}
            className="rounded-full bg-white px-5 py-2 text-xs font-bold text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
          >
            {modalData?.btn1Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;