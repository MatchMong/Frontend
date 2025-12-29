import { SEARCH, SimpleCalendar } from "./index"
import { UserCard } from "../main/Modal";
import { useEffect, useState } from "react";

export const ASIDE = ({ userList, roomModal, search }) => {
    const [listmodal, setListmodal] = useState(false);

    const handelChangeSearch = (e) => {
        search(e.target.value)
    }

    const handleRoomClick = (() => {
        roomModal((prev) => !prev);
    })

    const handleUserListClick = (() => {
        setListmodal((prev) => !prev);
    })
    
    return (
        <div className="w-82 h-full flex flex-col justify-between items-start font-pretendard font-medium placeholder:font-medium">
            <SEARCH
                iconSrc="./icon/search.svg"
                iconSize="28"
                iconPosition="left"
                placeholder="팀 또는 프로젝트 검색"
                onChange={(e) => handelChangeSearch(e)}
            />
            <button
                className="w-70 h-14 bg-white p-4 rounded-xl shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)] cursor-pointer"
                onClick={handleRoomClick}
            >
                <img src="./icon/createRoom.svg" />
            </button>
            <div className="relative">
                <button
                    className="w-70 h-14 bg-white pl-4 pr-2.5 rounded-xl flex flex-row justify-between shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)] cursor-pointer focus:outline-none"
                    onClick={handleUserListClick}
                >
                    <div className="w-full flex flex-row justify-start items-center gap-1">
                        <img src="./icon/user.svg" />
                        <p className="font-pretendard font-medium">유저목록</p>
                    </div>
                    <img src="./icon/underArrow.svg" width={32} className={`${listmodal ? "rotate-180" : "rotate-0"}`}/>
                </button>
                {listmodal && (
                    <>
                        <div onClick={handleUserListClick} className="fixed inset-0 z-40">
                            <div onClick={(e) => e.stopPropagation()} className="w-70 h-80 flex flex-col absolute top-90 left-15 z-41 px-5 py-8 gap-y-4 overflow-y-auto bg-white rounded-b-xl shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]">
                                {userList?.map((r) => (
                                    <UserCard
                                        key={r.id}
                                        user={r.nickname}
                                        major={r.major}
                                        bg="white"
                                        iconSize={36}
                                        profileText={14}
                                        specialtyText={10}
                                        ml={8}
                                        onlyUser={false}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <SimpleCalendar />
        </div>
    )
}