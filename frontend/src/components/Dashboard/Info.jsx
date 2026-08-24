const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-1">
        {label}
      </p>

      <p className="text-white font-medium">
        {value}
      </p>
    </div>
  );
};

export default Info;