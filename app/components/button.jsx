export const BUTTON = ({label, activate, ...buttonProps}) => {

    return (
        <div className="w-[calc(100%-48px)] box-border mt-10 mb-7 mx-6">
            {activate && (
                <button className="w-full h-[62px] bg-linear-to-t from-[#5F79FF] to-[#3A95FF] rounded-[10px] text-white text-xl cursor-pointer" {...buttonProps}>
                    {label}
                </button>
            )}
            {!activate && (
                <button className="w-full h-[62px] bg-[#DCDCDD] rounded-[10px] text-white text-xl" {...buttonProps}>
                    {label}
                </button>
            )}
        </div>
    );
}