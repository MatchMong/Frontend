const InputField = ({ label, value, onChange, className }) => {
  return (
    <div className={`flex flex-col w-full sm:w-1/2 ${className}`}>
      <label className="text-sm font-semibold" >{label}</label>
      <input 
        type="text"
        value={value}
        onChange={onChange}
        className="flex bg-[#F6F6F6] rounded-lg w-[348px] h-[44px] mb-10 p-2"
      />
    </div>
  );
};

export default InputField;


