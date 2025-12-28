'use client'
import { useRouter } from "next/navigation"
import { FetchPostAuth } from "../hook/Fetch";
export const MainHeader = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await FetchPostAuth("/api/logout", null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
        } catch(error) {
            console.log("로그아웃 실패: " + error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
        }
    }

    return (
        <div className="w-full h-17 bg-white flex items-center justify-between px-6">
            <img src="/icon/M&M.svg" width={96} onClick={() => router.push("/")} className="cursor-pointer" />
            <div className="flex flex-row gap-3">
                <img src="/icon/alram.svg" width={28} />
                <img src="/icon/profile.svg" width={40} />
                <img src="/icon/logout.svg" width={112} onClick={handleLogout} />
            </div>
        </div>
    )
}