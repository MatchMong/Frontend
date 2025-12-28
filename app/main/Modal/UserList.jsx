// export const UserList = ({
//     closeClick,
//     roomId,
//     specialty,
// }) => {
//     return (
//         <div>
//             <div className="flex justify-center items-center fixed inset-0 z-40 bg-black/50" onClick={() => closeClick?.()}>
//                 <div className="fixed w-110 h-120 z-50 rounded-[20px] p-7 bg-white"
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     <p className="text-[32px] font-semibold font-pretendard mb-4">프로젝트 이름</p>
//                     <div className="flex flex-col max-h-[355px] overflow-y-auto gap-y-4">
//                         <UserCard
//                             user={user.name}
//                             specialty={specialty}
//                         />
//                         <UserCard
//                             user={user.name}
//                             specialty={specialty}
//                         />
//                         <UserCard
//                             user={user.name}
//                             specialty={specialty}
//                         />
//                         <UserCard
//                             user={user.name}
//                             specialty={specialty}
//                         />
//                         <UserCard
//                             user={user.name}
//                             specialty={specialty}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
'use client';
import { useEffect, useState } from "react";
import { FetchDeleteAuth, FetchGetAuth } from "../../API/Fetch";

export const UserList = ({ closeClick, roomId, roomTitle }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await FetchGetAuth(`/api/rooms/${roomId}/participants`, null);
        const list = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
        setUserList(list);
      } catch (error) {
        console.log("방 인원 조회 실패:", error);
        setUserList([]);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    if (roomId) fetchParticipants();
    else setLoading(false);
  }, [roomId]);

  const TrashClick = async (targetId) => {
    try {
      await FetchDeleteAuth(`/api/rooms/${roomId}/participants/${encodeURIComponent(targetId)}`);
      setUserList((prev) => prev.filter((u) => String(u.userDiscordId) !== String(targetId)));
    } catch (e) {
      console.log("추방 실패:", e);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center fixed inset-0 z-40 bg-black/50" onClick={() => closeClick?.()}>
        <div className="fixed w-110 h-120 z-50 rounded-[20px] p-7 bg-white" onClick={(e) => e.stopPropagation()}>
          <p className="text-[32px] font-semibold font-pretendard mb-4">{roomTitle}</p>

          <div className="flex flex-col max-h-[355px] overflow-y-auto gap-y-4">
            {loading ? (
              <p className="text-[#777B86] text-sm">불러오는 중...</p>
            ) : userList.length === 0 ? (
              <p className="text-[#777B86] text-sm">참가자가 없습니다.</p>
            ) : (
              userList.map((u, idx) => (
                <UserCard
                  key={u.userDiscordId ?? u.userNickname ?? idx}
                  user={u.userNickname}
                  discordId={u.userDiscordId}
                  onTrashClick={() => TrashClick(u.userDiscordId)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



// export const UserCard = ({ user, specialty, bg="F5F7F9", cardP=12, ml, iconSize=52, profileText=24, nameText=18, specialtyText=14, onlyUser }) => {
//     return (
//         <>
//             {!onlyUser && (
//                 <div className={`flex items-center p-[${cardP}px] w-full h-21 bg-[#${bg}] rounded-xl`}>
//                     <div className="relative flex justify-center items-center">
//                         <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>이</p>
//                         <img src="icon/userBg.svg" width={iconSize}/>
//                     </div>
//                     <div className="ml-5">
//                         <p className={`text-[${nameText}px] font-medium font-pretendard`}>이름</p>
//                         <p className="text-[#777B86] text-[14px] font-pretendard">전공</p>
//                     </div>
//                 </div>
//             )}
//             {onlyUser && (
//                 <div className="flex">
//                     <div className="relative flex justify-center items-center">
//                         <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>이</p>
//                         <img src="icon/userBg.svg" width={iconSize}/>
//                     </div>
//                     <div style={{ marginLeft: `${ml}px` }}>
//                         <p className={`text-[${nameText}px] font-medium font-pretendard`}>이름</p>
//                         <p className={`text-[#777B86] text-[${specialtyText}px] font-pretendard`}>전공</p>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }
export const UserCard = ({
  user,
  specialty,
  bg = "F5F7F9",
  cardP = 12,
  ml,
  iconSize = 52,
  profileText = 24,
  nameText = 18,
  specialtyText = 14,
  onlyUser,
  onTrashClick,
}) => {
  const firstChar = (user ?? "").toString().trim().charAt(0) || "?";

  return (
    <>
      {!onlyUser && (
        <div className={`relative flex items-center p-[${cardP}px] w-full h-21 bg-[#${bg}] rounded-xl`}>
          <button
            type="button"
            onClick={onTrashClick}
            className="absolute right-5 top-6 cursor-pointer"
          >
            <img src="icon/trash.svg" alt="delete" />
          </button>

          <div className="relative flex justify-center items-center">
            <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>
              {firstChar}
            </p>
            <img src="icon/userBg.svg" width={iconSize} />
          </div>

          <div className="ml-5">
            <p className={`text-[${nameText}px] font-medium font-pretendard`}>{user ?? "이름"}</p>
            <p className="text-[#777B86] text-[14px] font-pretendard">{specialty ?? "전공"}</p>
          </div>
        </div>
      )}

      {onlyUser && (
        <div className="relative flex">
          <button
            type="button"
            onClick={onTrashClick}
            className="absolute right-5 top-6 cursor-pointer"
          >
            <img src="icon/trash.svg" alt="delete" />
          </button>

          <div className="relative flex justify-center items-center">
            <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>
              {firstChar}
            </p>
            <img src="icon/userBg.svg" width={iconSize} />
          </div>

          <div style={{ marginLeft: `${ml}px` }}>
            <p className={`text-[${nameText}px] font-medium font-pretendard`}>{user ?? "이름"}</p>
            <p className={`text-[#777B86] text-[${specialtyText}px] font-pretendard`}>{specialty ?? "전공"}</p>
          </div>
        </div>
      )}
    </>
  );
};
