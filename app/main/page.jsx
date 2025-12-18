'use client';
import { SEARCH, SimpleCalendar, POST } from "@/app/components/";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CreateRoom, UserList, UserCard } from "./Modal/";
import { useRouter } from "next/navigation";
import { FetchGet } from "../API/Fetch";

export default function HomePage() {
    const gridRef = useRef(null);
    const [gridHeight, setGridHeight] = useState(0);
    const [userModal, setUserModal] = useState(false);
    const [roomModal, setRoomModal] = useState(false);
    const [userList, setUserList] = useState(false);
    const [post, setPost] = useState("");
    const router = useRouter();

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
        setGridHeight(getGridHeight());
    }, []);

    const handleUserClick = (() => {
        setUserModal((prev) => !prev);
    })

    const handleRoomClick = (() => {
        setRoomModal((prev) => !prev);
    })

    const handleUserListClick = (() => {
        setUserList((prev) => !prev);
    })

    return (
        <div className="w-full h-screen bg-[#EAEDFF]">
            <div className="w-full h-17 bg-white flex items-center justify-between px-6">
                <img src="icon/M&M.svg" width={96} onClick={() => router.push("/")} className="cursor-pointer" />
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
                        className="w-70 h-14 bg-white p-4 rounded-xl shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)] cursor-pointer"
                        onClick={handleRoomClick}
                    >
                        <img src="./icon/createRoom.svg"/>
                    </button>
                    <div className="relative">
                        <button
                            className="w-70 h-14 bg-white pl-4 pr-2.5 rounded-xl flex flex-row justify-between shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)] cursor-pointer"
                            onClick={handleUserListClick}
                        >
                            <div className="w-full flex flex-row justify-start items-center gap-1">
                                <img src="./icon/user.svg"/>
                                <p className="font-pretendard font-medium">유저목록</p>
                            </div>                        
                            <img src="./icon/underArrow.svg" width={32} />
                        </button>
                        {userList && (
                            <div className="w-70 h-63 flex flex-col absolute top-10 z-10 px-5 py-8 gap-y-4 overflow-y-auto bg-white rounded-xl shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]">
                                <UserCard
                                    bg="white"
                                    iconSize={36}
                                    profileText={14}
                                    specialtyText={10}
                                    ml={8}
                                    onlyUser={true}
                                />
                                <UserCard
                                    bg="white"
                                    iconSize={36}
                                    profileText={14}
                                    specialtyText={10}
                                    ml={8}
                                    onlyUser={true}
                                />
                                <UserCard
                                    bg="white"
                                    iconSize={36}
                                    profileText={14}
                                    specialtyText={10}
                                    ml={8}
                                    onlyUser={true}
                                />
                                <UserCard
                                    bg="white"
                                    iconSize={36}
                                    profileText={14}
                                    specialtyText={10}
                                    ml={8}
                                    onlyUser={true}
                                />
                            </div>
                        )}
                    </div>
                    <SimpleCalendar />
                </div>
                <div ref={gridRef} className="w-full ml-15 grid grid-cols-2 gap-x-12 gap-y-13 overflow-y-auto pr-2" style={{ gridAutoRows: `${(gridHeight-52)/2}px` }}>
                    <POST
                        title={"1234"}
                        onUserClick={handleUserClick}
                    />
                    <POST 
                        onUserClick={handleUserClick}
                    />
                    <POST 
                        onUserClick={handleUserClick}
                    />
                    <POST 
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
    );
}