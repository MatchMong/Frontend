import { useState } from "react";

export const INPUT = ({
  label,
  maxlength,
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
  const isLeft = iconPosition === "left";

  const iconPadding = hasIcon
    ? isLeft
      ? "pl-12 pr-6"
      : "pl-6 pr-12"
    : "px-6";

  const iconPositionClass = isLeft ? "left-4" : "right-4";
  const iconSizeStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
  };

  // 눌렸을 때 살짝 아래로 (4px 정도) 내리기
  const iconTopClass = iconPressed
    ? "top-[calc(50%+4px)]"
    : "top-1/2";

  const handleIconClick = () => {
    setIconPressed((prev) => !prev); // 위치 토글
    if (onIconClick) onIconClick();  // 원래 콜백도 실행 (예: 비밀번호 토글)
  };

  return (
    <div className="w-[calc(100%-48px)] box-border m-6">
      <p className="ml-3 mb-2">{label}</p>

      {error && (
        <div className="relative">
            <input
              className={`w-full box-border h-[63px] rounded-2xl border-2 border-[#E54747] pl-[23px] py-5 ${iconPadding} text-[#777C89] font-pretendard font-medium placeholder:text-[#777C89] placeholder:font-pretendard placeholder:font-medium`}
              maxLength={maxlength}
              {...inputProps}
            />
            <p className="ml-3 mt-1 mb-[-19px] text-[#E54747] text-[10px] font-medium">{errorMessage}</p>
            {hasIcon &&
            (iconAsButton ? (
                <button
                  type="button"
                  onClick={handleIconClick}
                  className={`absolute ${iconTopClass} -translate-y-6 ${iconPositionClass} cursor-pointer`}
                >
                  <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
                </button>
              ) : (
                <div
                  className={`absolute ${iconTopClass} -translate-y-6 ${iconPositionClass} pointer-events-none`}
                >
                  <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
                </div>
              ))}
        </div>
      )}
      {!error && (
      <div className="relative">
        <input
          className={`w-full box-border h-[63px] rounded-2xl border border-[#d9d9d9] py-5 ${iconPadding} text-[#777C89] placeholder:text-[#777C89]`}
          maxLength={maxlength}
          {...inputProps}
        />

        {hasIcon &&
          (iconAsButton ? (
            <button
              type="button"
              onClick={handleIconClick}
              className={`absolute ${iconTopClass} -translate-y-1/2 ${iconPositionClass} cursor-pointer`}
            >
              <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
            </button>
          ) : (
            <div
              className={`absolute ${iconTopClass} -translate-y-1/2 ${iconPositionClass} pointer-events-none`}
            >
              <img src={iconSrc} alt={iconAlt} style={iconSizeStyle} />
            </div>
          ))}
      </div>
      )}
    </div>
  );
};
