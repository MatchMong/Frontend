// import { useState } from "react";

// export const INPUT = ({
//   label,
//   labelColor,
//   maxlength,
//   iconSrc,
//   iconAlt = "icon",
//   iconPosition = "right",
//   iconAsButton = false,
//   iconSize = 20,
//   onIconClick,
//   error,
//   errorMessage,
//   ...inputProps
// }) => {
//   const [iconPressed, setIconPressed] = useState(false);

//   const hasIcon = !!iconSrc;
//   const isLeft = iconPosition === "left";

//   const iconPadding = hasIcon
//     ? isLeft
//       ? "pl-12 pr-4"
//       : "pl-4 pr-12"
//     : "px-4";

//   const iconPositionClass = isLeft ? "left-4" : "right-4";
//   const iconSizeStyle = {
//     width: `${iconSize}px`,
//     height: `${iconSize}px`,
//   };

//   눌렸을 때 살짝 아래로 (4px 정도) 내리기
//   const iconTopClass = iconPressed
//     ? "top-[calc(50%+4px)]"
//     : "top-1/2";

//   const handleIconClick = () => {
//     setIconPressed((prev) => !prev); // 위치 토글
//     if (onIconClick) onIconClick();  // 원래 콜백도 실행 (예: 비밀번호 토글)
//   };

//   return (
//     <div className={`w-[calc(100%-48px)] text-[#${labelColor}] box-border m-6`}>
//       <p className="ml-3 mb-2 cursor-default">{label}</p>

//       {error && (
//         <div className="relative">
//             <input
//               className={`w-full bg-white box-border h-[60px] rounded-2xl border-2 border-[#E54747] pl-[23px] py-5 ${iconPadding} text-[#777C89] font-pretendard font-medium placeholder:text-[#777C89] placeholder:font-pretendard placeholder:font-medium`}
//               maxLength={maxlength}
//               {...inputProps}
//             />
//             <p className="ml-3 mt-1 mb-[-19px] text-[#E54747] text-[10px] font-medium">{errorMessage}</p>
//             {hasIcon &&
//             (iconAsButton ? (
//                 <button
//                   type="button"
//                   onClick={handleIconClick}
//                   className={`absolute ${iconTopClass} -translate-y-6 ${iconPositionClass} cursor-pointer`}
//                 >
//                   <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
//                 </button>
//               ) : (
//                 <div
//                   className={`absolute ${iconTopClass} -translate-y-6 ${iconPositionClass} pointer-events-none`}
//                 >
//                   <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
//                 </div>
//               ))}
//         </div>
//       )}
//       {!error && (
//       <div className="relative">
//         <input
//           className={`w-full bg-white box-border h-[60px] rounded-2xl border border-[#d9d9d9] py-5 ${iconPadding} text-[#777C89] placeholder:text-[#777C89]`}
//           maxLength={maxlength}
//           {...inputProps}
//         />

//         {hasIcon &&
//           (iconAsButton ? (
//             <button
//               type="button"
//               onClick={handleIconClick}
//               className={`absolute ${iconTopClass} -translate-y-1/2 ${iconPositionClass} cursor-pointer`}
//             >
//               <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
//             </button>
//           ) : (
//             <div
//               className={`absolute ${iconTopClass} -translate-y-1/2 ${iconPositionClass} pointer-events-none`}
//             >
//               <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
//             </div>
//           ))}
//       </div>
//       )}
//     </div>
//   );
// };
import { useState } from "react";

export const INPUT = ({
  label,
  labelColor,
  maxlength,
  rightInnerText,
  inputClassName,
  iconSrc,
  iconAlt = "icon",
  iconPosition = "right",
  iconAsButton = false,
  iconSize = 20,
  onIconClick,
  error,
  errorMessage,
  ...inputProps
}) => {
  const [iconPressed, setIconPressed] = useState(false);

  const hasIcon = !!iconSrc;
  const isLeftIcon = iconPosition === "left";
  const hasRightText = !!rightInnerText;

  const hasRightIcon = hasIcon && !isLeftIcon;
  const prClass = hasRightIcon && hasRightText ? "pr-24" : (hasRightIcon || hasRightText ? "pr-12" : "pr-4");
  const plClass = hasIcon && isLeftIcon ? "pl-12" : "pl-4";

  const iconPositionClass = isLeftIcon ? "left-4" : "right-4";
  const iconSizeStyle = { width: `${iconSize}px`, height: `${iconSize}px` };
  const iconTopClass = iconPressed ? "top-[calc(50%+4px)]" : "top-1/2";

  const rightTextPosClass = hasRightIcon ? "right-12" : "right-4";

  const handleIconClick = () => {
    setIconPressed((prev) => !prev);
    if (onIconClick) onIconClick();
  };

  return (
    <div className={`w-[calc(100%-48px)] text-[#${labelColor}] box-border m-6`}>
      <p className="ml-3 mb-2 cursor-default">{label}</p>

      <div className="relative">
        {hasRightText && (
          <div className={`absolute ${rightTextPosClass} top-1/2 -translate-y-1/2 text-xs text-[#777B86] pointer-events-none`}>
            {rightInnerText}
          </div>
        )}

        {error ? (
          <>
            <input
              className={`w-full bg-white box-border h-[60px] rounded-2xl border-2 border-[#E54747] py-5 ${plClass} ${prClass} text-[#777C89] font-pretendard font-medium placeholder:text-[#777C89] placeholder:font-pretendard placeholder:font-medium ${inputClassName ?? ""}`}
              maxLength={maxlength}
              {...inputProps}
            />
            <p className="ml-3 mt-1 mb-[-19px] text-[#E54747] text-[10px] font-medium">{errorMessage}</p>
          </>
        ) : (
          <input
            className={`w-full bg-white box-border h-[60px] rounded-2xl border border-[#d9d9d9] py-5 ${plClass} ${prClass} text-[#777C89] placeholder:text-[#777C89] ${inputClassName ?? ""}`}
            maxLength={maxlength}
            {...inputProps}
          />
        )}

        {hasIcon &&
          (iconAsButton ? (
            <button
              type="button"
              onClick={handleIconClick}
              className={`absolute ${iconTopClass} ${error ? "-translate-y-6" : "-translate-y-1/2"} ${iconPositionClass} cursor-pointer`}
            >
              <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
            </button>
          ) : (
            <div className={`absolute ${iconTopClass} ${error ? "-translate-y-6" : "-translate-y-1/2"} ${iconPositionClass} pointer-events-none`}>
              <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
            </div>
          ))}
      </div>
    </div>
  );
};
