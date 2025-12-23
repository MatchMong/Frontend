'use client';
import { SEARCH, SimpleCalendar, POST, MainHeader, ASIDE } from "@/app/components/";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CreateRoom, UserList, UserCard } from "./Modal/";
import { useRouter } from "next/navigation";
import { FetchGet } from "../hook/Fetch";

export default function HomePage() {
    const gridRef = useRef(null);

    const [gridHeight, setGridHeight] = useState(0);
    const [userModal, setUserModal] = useState(false);
    const [roomModal, setRoomModal] = useState(false);
    const [base, setBase] = useState(null);

    const getGridHeight = () => {
        const el = gridRef.current;
        if (!el) return 0;
        return Math.ceil(el.getBoundingClientRect().height);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await FetchGet('/main');
    //                 setPost(res);
    //         } catch(error) {
    //             console.log("게시물 목록 불러오기 실패: " + error)
    //         }
    //     };

    //     fetchData();
    // }, [])

    useLayoutEffect(() => {
        if (!base) return;
        setGridHeight(getGridHeight());
    }, [base]);
    useLayoutEffect(() => {
        setBase({ w: window.innerWidth, h: window.innerHeight });
    }, []);

    const handleUserClick = (() => {
        setUserModal((prev) => !prev);
    })
    const handleRoomClick = (() => {
        setRoomModal((prev) => !prev);
    })

    if (!base) return null;

    return (
        <div className="w-screen h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF] overflow-auto">
            <div style={{ width: base.w, height: base.h }} className="bg-[#EAEDFF]">
                <div className="w-full h-full bg-[#EAEDFF] mx-auto">
                    <MainHeader/>
                    <div className="w-full h-22"></div>
                    <div className="w-full h-[calc(100%-244px)] flex flex-row pl-15 pr-16">
                        <ASIDE
                            roomModal={handleRoomClick}
                        />
                        <div ref={gridRef} className="w-full ml-15 grid grid-cols-2 gap-x-12 gap-y-13 overflow-y-auto pr-2" style={{ gridAutoRows: `${(gridHeight-52)/2}px` }}>
                            <POST
                                title={"제목"}
                                label={"설명"}
                                onUserClick={handleUserClick}
                            />
                            <POST
                                title={"제목"}
                                label={"설명"}
                                onUserClick={handleUserClick}
                            />
                            <POST 
                                title={"제목"}
                                label={"설명"}
                                onUserClick={handleUserClick}
                            />
                            <POST 
                                title={"제목"}
                                label={"설명"}
                                onUserClick={handleUserClick}
                            />
                            <POST 
                                title={"제목"}
                                label={"설명"}
                                onUserClick={handleUserClick}
                            />
                            <POST 
                                title={"제목"}
                                label={"설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명"}
                                onUserClick={handleUserClick}
                            />
                        </div>
                    </div>
                    <div className="w-full h-22"></div>

                    {userModal && (
                        <UserList
                            closeClick={handleUserClick}
                        />
                    )}

                    {roomModal && (
                        <CreateRoom
                            closeClick={handleRoomClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}