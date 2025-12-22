'use client';
import { useRouter } from "next/navigation";

export default function StartPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF] gap-8">
            <div className="w-[588px] h-[230px] flex items-center justify-center -mb-5">
                <img src="/icon/M&M.svg" alt="M&M" width={588} 
                    className="drop-shadow-[2px_4px_8px_rgba(0,0,0,0.2)]"
                />
            </div>
            <img src="/icon/Match & Mong.svg" alt="Match & Mong" />
            <button className="w-[480px] h-[102px] bg-[#5070FD] rounded-[20px] p-2.5 shadow-[2px_4px_2px_0_rgba(0,0,0,0.2)] text-white/90 text-4xl font-pretendard font-medium"
                onClick={() => {router.push('/login')}}
            >
                start
            </button>
        </div>
    );
}