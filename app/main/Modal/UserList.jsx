export const UserList = ({
    closeClick,
    user,
    specialty,
    bg,
}) => {
    return (
        <div>
            <div className="flex justify-center items-center fixed inset-0 z-40 bg-black/50" onClick={() => closeClick?.()}>
                <div className="fixed w-110 h-120 z-50 rounded-[20px] p-7 bg-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-[32px] font-semibold font-pretendard mb-4">프로젝트 이름</p>
                    <div className="flex flex-col max-h-[355px] overflow-y-auto gap-y-4">
                        {/* {map.user && (
                            d
                        )} */}
                        <UserCard
                            // user={user.name}
                            specialty={specialty}
                        />
                        <UserCard
                            // user={user.name}
                            specialty={specialty}
                        />
                        <UserCard
                            // user={user.name}
                            specialty={specialty}
                        />
                        <UserCard
                            // user={user.name}
                            specialty={specialty}
                        />
                        <UserCard
                            // user={user.name}
                            specialty={specialty}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const UserCard = ({ user, specialty, bg="F5F7F9", cardP=12, ml, iconSize=52, profileText=24, nameText=18, specialtyText=14, onlyUser }) => {
    return (
        <>
            {!onlyUser && (
                <div className={`flex items-center p-[${cardP}px] w-full h-21 bg-[#${bg}] rounded-xl`}>
                    <div className="relative flex justify-center items-center">
                        <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>이</p>
                        <img src="icon/userBg.svg" width={iconSize}/>
                    </div>
                    <div className="ml-5">
                        <p className={`text-[${nameText}px] font-medium font-pretendard`}>이름</p>
                        <p className="text-[#777B86] text-[14px] font-pretendard">전공</p>
                    </div>
                </div>
            )}
            {onlyUser && (
                <div className="flex">
                    <div className="relative flex justify-center items-center">
                        <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>이</p>
                        <img src="icon/userBg.svg" width={iconSize}/>
                    </div>
                    <div style={{ marginLeft: `${ml}px` }}>
                        <p className={`text-[${nameText}px] font-medium font-pretendard`}>이름</p>
                        <p className={`text-[#777B86] text-[${specialtyText}px] font-pretendard`}>전공</p>
                    </div>
                </div>
            )}
        </>
    )
}