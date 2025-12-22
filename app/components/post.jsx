export const POST = ({title, label, user, onUserClick,...postProps}) => {


    return(
        <div className="flex flex-col justify-between items-center bg-white rounded-[20px] px-5 pt-4 pb-6 shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]"{...postProps}>
            <div className="w-full">
                <PostHeader
                    title={title}
                    label={label}
                    user={user}
                    onUserClick={onUserClick}
                />
            </div>
            <div className="w-full flex justify-center">
                <button className="w-full h-11 mx-10 bg-linear-to-tr from-[#5679FE] to-[#3F91FF]/80 rounded-[10px] cursor-pointer">
                    <p className="text-white font-pretendard font-medium">멤버 참여신청</p>
                </button>
            </div>
        </div>
    )
}

export const PostHeader = ({title, label, user, onUserClick}) => {
    return(
        <div>
            <div className="flex items-center">
                <div className="flex justify-start">
                    <div className="relative flex justify-center items-center">
                        <p className="absolute text-white text-2xl font-pretendard font-bold">{title?.charAt(0) ?? ""}</p>
                        <img src="icon/roomBg.svg"/>
                    </div>
                </div>
                <p className="ml-2 text-2xl font-pretendard font-bold">{title}</p>
            </div>
            <p className="pt-3 pb-4 text-[#777B86] text-xs font-medium font-pretendard">{label}</p>
            <div className="flex flex-row justify-start items-center gap-1">
                <img src="./icon/user(gray).svg"/>
                <p onClick={onUserClick} className="text-[#777B86] text-[14px] font-pretendard font-medium cursor-pointer">{user}명의 인원</p>
            </div>
        </div>
    )
}