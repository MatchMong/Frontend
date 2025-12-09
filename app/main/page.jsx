'use client';
import { SEARCH, SimpleCalendar, POST } from "@/app/components/";
import { useLayoutEffect, useRef, useState } from "react";

export default function HomePage() {
    const gridRef = useRef(null);
    const [gridHeight, setGridHeight] = useState(0);

    const getGridHeight = () => {
        const el = gridRef.current;
        if (!el) return 0;
        return Math.ceil(el.getBoundingClientRect().height);
    };

    useLayoutEffect(() => {
        setGridHeight(getGridHeight());
    }, []);

    return (
        <div className="w-full h-screen bg-[#EAEDFF]">
            <div className="w-full h-17 bg-white flex items-center justify-between px-6">
                <img src="icon/M&M.svg" width={96} alt="" />
                <div className="flex flex-row gap-3">
                    <img src="icon/alram.svg" width={28} />
                    <img src="icon/profile.svg" width={40} />
                    <img src="icon/logout.svg" width={112} />
                </div>
            </div>
            <div className="w-full h-22"></div>
            <div className="w-full h-[calc(100%-244px)] flex flex-row pl-15 pr-16">
                <div className="w-82 h-full flex flex-col justify-between items-start font-pretendard font-medium placeholder:font-medium">
                    <SEARCH
                        iconSrc="./icon/search.svg"
                        iconSize="28"
                        iconPosition="left"
                        placeholder="팀 또는 프로젝트 검색"
                    />
                    <button
                        className="w-70 h-14 bg-white p-4 rounded-xl shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]"
                    >
                        <img src="./icon/createRoom.svg"/>
                    </button>
                    <button
                        className="w-70 h-14 bg-white pl-4 pr-2.5 rounded-xl flex flex-row justify-between shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]"
                    >
                        <div className="w-full flex flex-row justify-start items-center gap-1">
                            <img src="./icon/user.svg"/>
                            <p className="font-pretendard font-medium">유저목록</p>
                        </div>
                        
                        <img src="./icon/underArrow.svg" width={32} />
                    </button>
                    <SimpleCalendar />
                </div>
                <div ref={gridRef} className="w-full ml-15 grid grid-cols-2 gap-x-12 gap-y-13 overflow-y-auto pr-2" style={{ gridAutoRows: `${(gridHeight-52)/2}px` }}>
                    <POST />
                    <POST />
                    <POST />
                    <POST />
                </div>
            </div>
            <div className="w-full h-22"></div>
        </div>
    );
}