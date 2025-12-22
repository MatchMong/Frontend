export const CIRCLE = ({ child, activate, ...circleProps }) => {
    return (
        <div>
            {activate ? (
                <div className="w-[42px] h-[42px] rounded-full bg-[#5772FE] text-white text-lg flex items-center justify-center" {...circleProps}>
                    {child}
                </div>
            ) : (
                <div className="w-[42px] h-[42px] rounded-full bg-[#D9D9D9] text-[#777C89]/68 text-lg flex items-center justify-center" {...circleProps}>
                    {child}
                </div>
            )}
        </div>
    );
}