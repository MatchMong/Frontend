"use client";

export default function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white w-[436px] p-[28px] rounded-lg shadow-lg z-10">
        <p className="font-semibold text-[32px] font-bold text-black pt-[9px]">프로젝트 팀</p>
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[15px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공</p>
        </div>
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공</p>
        </div>
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공</p>
        </div>
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공</p>
        </div>
      </div>
    </div>
  );
}
