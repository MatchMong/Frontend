import { INPUT, SELECT } from "../../components"
import { UserCard } from "./UserList"
import { useState } from "react"

export const CreateRoom = ({
    closeClick,
    selectValue,
}) => {
    const [userList, setUserList] = useState(false)

    const handleUserListClick = (() => {
        setUserList((prev) => !prev);
    })

    return (
        <div>
            <div className="flex justify-center items-center fixed inset-0 z-40 bg-black/50" onClick={() => closeClick?.()}>
                <div className="fixed w-110 h-135 z-50 rounded-[20px] p-7 bg-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-[32px] font-semibold font-pretendard mb-4">새 팀 생성하기</p>
                    <INPUT
                        label={"팀 이름"}
                        labelColor={"777B86"}
                    />
                    <INPUT
                        label={"팀 설명"}
                        labelColor={"777B86"}
                    />
                    <SELECT
                        label={"팀 인원 선택"}
                        placeholder={"유저 목록"}
                        selectedValue={selectValue || ""}
                        onClick={handleUserListClick}
                    />
                    {userList && (
                        <div className="w-[336px] h-63 flex flex-col absolute bottom-[-112] right-13 border border-[#D9D9D9] border-t-0 z-10 px-5 py-8 gap-y-4 overflow-y-auto scrollbar-hide bg-white rounded-b-xl">
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
                    <div className="w-[calc(100%-48px)] m-6 text-white text-xl font-medium font-pretendard">
                        <button className="w-full h-15 bg-[#5570FF] rounded-xl">
                            생성하기
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}