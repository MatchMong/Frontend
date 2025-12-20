"use client";
import { useEffect,useState } from "react";
import { data } from "react-router-dom";
export default function Modal({ onClose }) {

  const Data = () => {
      const router = useRouter();
      cosnt [data, setData] = useState([]);
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("localhost:8090/team/make");
      const result = await res.json();
      setData(result);
      try { 
        const res = await fetch("localhost:8090/team/make");

      if(!res.ok) throw new Error("서버 응답이 좋지 않습니다.");
        const data = await res.json();
      setData(data);
  }   catch (error) {
        console.error("서버 응답이 좋지 않습니다.", error);
        setError(true);
  }
}}, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white w-[436px] p-[28px] rounded-lg shadow-lg z-10">
        <p className="font-semibold text-[32px] font-bold text-black pt-[9px]">프로젝트 팀{data?.teamName}</p>
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[15px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사{data?.userName?.[0]}</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름{data?.userName}</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공{data?.major}</p>
        </div>
        {data.length >=2 && (
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사{data?.userName?.[0]}</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름{data?.userName}</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공{data?.major}</p>
        </div>
      )}
      { data.length >=3 &&(
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사{data?.userName?.[0]}</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름{data?.userName}</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공{data?.major}</p>
        </div>
      )}
      {data.length >=4 &&(
        <div className="font-Medium bg-[#F5F7F9] rounded-md flex mt-[16px] p-[12px]">
          <p className="font-semibold rounded-full w-[52px] h-[52px] bg-[#5570FF] mt-[3px] text-[20px] text-center pt-[10px]">사{data?.userName?.[0]}</p>
          <p className="font-Regular text-black text-[18px] mt-[9px] ml-[18px]">사용자 이름{data?.userName}</p>
          <p className="fixed text-[#777B86] mt-[36px] ml-[72px] text-[14px]">사용자 전공{data?.major}</p>
        </div>
  )}
      {error && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}
    </div>
  </div>
);
}

