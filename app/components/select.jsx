export const SELECT = ({ label, placeholder, selectedValue, onClick }) => {

    return (
        <div className="relative w-[calc(100%-48px)] m-6">
            {label && <label className="text-[#777B86] font-pretendard ml-3 mb-2">{label}</label>}
            <div className="absolute w-full h-15 z-10 rounded-xl"
                onClick={onClick}
            />
            <select
                className="w-full h-15 flex items-center bg-white border border-[#D9D9D9] px-3 appearance-none rounded-xl"
                value={selectedValue}
                disabled
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {/* {options.map((option) => (
                    <option
                    key={`select_${option.key}_${option.value}`}
                    value={option.value}
                    data-name={option.value}
                    >
                    {option.value}
                    </option>
                ))} */}
            </select>
            <span className="absolute bottom-[13px] right-4 ...">
                <img
                    src="icon/underArrow.svg"
                    alt="arrow-left"
                    width={32}
                />
            </span>
        </div>
    )
}