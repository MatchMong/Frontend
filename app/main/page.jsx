'use client';
import { SEARCH, SimpleCalendar, POST, MainHeader, ASIDE } from "@/app/components/";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CreateRoom, UserList, UserCard } from "./Modal/";
import { useRouter } from "next/navigation";
import { FetchGetAuth, FetchPostAuth } from "../hook/Fetch";

export default function HomePage() {
    const gridRef = useRef(null);

    const [gridHeight, setGridHeight] = useState(0);
    const [userModal, setUserModal] = useState(false);
    const [roomModal, setRoomModal] = useState(false);
    const [base, setBase] = useState(null);
    const [discordId, setDiscordId] = useState();
    const [room, setRoom] = useState([]);
    const [userList, setUserList] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedRoomTitle, setSelectedRoomTitle] = useState(null);
    const [selectedOwnerId ,setSelectedOwnerId] = useState("");
    const [search, setSearch] = useState("");

    const router = useRouter();

    const refreshPage = () => window.location.reload();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) router.replace("/login");
    }, [router]);

    const getGridHeight = () => {
        const el = gridRef.current;
        if (!el) return 0;
        return Math.ceil(el.getBoundingClientRect().height);
    };

    useEffect(() => {
        const Room = async() => {
            try {
                const res = await FetchGetAuth("/api/rooms", null);
                setRoom(res);
            } catch (error) {
                console.log("방 불러오기 실패: " + error)
            }
        }

        Room();
    }, []);

    useEffect(() => {
        const UserList = async () => {
            try {
                const res = await FetchGetAuth(`/api/users/profiles`, null);
                setUserList(res);
            } catch(error) {
                console.log("유저 목록 불러오기 실패: " + error)
            }
        };

        UserList();
    }, []);

    useEffect(() => { 
        const dId = async() => { 
            try { 
                const res = await FetchGetAuth("/api/user/discord-id", null); 
                setDiscordId(res); 
            } catch (error) { 
                console.log("디스코드 아이디 불러오기 실패: " + error) 
            } 
        }
        
        dId(); 
    }, []);

    const handleJoin = async(rid) => {
        try {
            await FetchPostAuth(`/api/rooms/${rid}/join`, null);
            refreshPage();
        } catch (error) {
            console.log("방 참가 요청 실패: " + error)
        }
    }

    useLayoutEffect(() => {
        if (!base) return;
        setGridHeight(getGridHeight());
    }, [base]);
    useLayoutEffect(() => {
        setBase({ w: window.innerWidth, h: window.innerHeight });
    }, []);

    const handleUserClick = (rid, rti, oid) => {
        setSelectedRoomId(rid);
        setSelectedRoomTitle(rti);
        setSelectedOwnerId(oid);
        setUserModal(true);
    };

    const closeUserModal = () => {
        setUserModal(false);
        setSelectedRoomId(null);
    };
    const handleRoomClick = (() => {
        setRoomModal((prev) => !prev);
    });

    if (!base) return null;

    return (
        <div className="w-screen h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF] overflow-auto">
            <div style={{ width: base.w, height: base.h }} className="bg-[#EAEDFF]">
                <div className="w-full h-full bg-[#EAEDFF] mx-auto">
                    <MainHeader/>
                    <div className="w-full h-22"></div>
                    <div className="w-full h-[calc(100%-244px)] flex flex-row pl-15 pr-16">
                        <ASIDE
                            search={setSearch}
                            userList={userList}
                            roomModal={handleRoomClick}
                        />
                        <div ref={gridRef} className="w-full ml-15 grid grid-cols-2 gap-x-12 gap-y-13 overflow-y-auto pr-2" style={{ gridAutoRows: `${(gridHeight-52)/2}px` }}>
                           {[...room]
                            .reverse()
                            .filter((r) => {
                                const q = search?.trim();
                                if (!q) return true;
                                return (r.roomtitle ?? "").toLowerCase().includes(q.toLowerCase());
                            })
                            .map((r) => (
                                <POST
                                key={r.roomId}
                                title={r.roomtitle}
                                label={r.roomwrite}
                                user={r.maxParticipants ?? 0}
                                roomId={r.roomId}
                                ownerId={r.ownerId}
                                onClick={() => handleJoin(r.roomId, discordId)}
                                onUserClick={() => handleUserClick(r.roomId, r.roomtitle, r.ownerId)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-22"></div>

                    {userModal && (
                        <UserList
                            roomId={selectedRoomId}
                            roomTitle={selectedRoomTitle}
                            ownerId={selectedOwnerId}
                            closeClick={closeUserModal}
                        />
                    )}

                    {roomModal && (
                        <CreateRoom
                            closeClick={handleRoomClick}
                            success={handleRoomClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}