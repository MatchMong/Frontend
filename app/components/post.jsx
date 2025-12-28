// import { useState, useEffect } from "react";
// import { FetchGetAuth } from "../jook/Fetch";

// export const POST = ({title, label, user, onUserClick, roomId, ownerId, ...postProps}) => {
//     const [userList, setUserList] = useState([]);
//     const [exists, setExists] = useState(false);

//     const myDiscordId = localStorage.getItem("discordId");

//     useEffect(() => {
//         const List = async() => {
//             try {
//                 const res = await FetchGetAuth(`/api/rooms/${roomId}/participants`, null);
//                 setUserList(res);
//             } catch (error) {
//                 console.log("방 인원 조회 실패: " + error)
//             }
//         }

//         List();
//     }, [roomId]);

//     useEffect(() => {
//         setExists(userList.includes(id));
//     }, [userList]);

//     return(
//         <div className="flex flex-col justify-between items-center bg-white rounded-[20px] px-5 pt-4 pb-6 shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]"{...postProps}>
//             <div className="w-full">
//                 <PostHeader
//                     title={title}
//                     label={label}
//                     user={user}
//                     onUserClick={onUserClick}
//                 />
//             </div>
//             <div className="w-full flex justify-center">
//                 {myDiscordId===ownerId || exists || userList.length>=user ? ( 
//                     <button className="w-full h-11 mx-10 rounded-[10px] cursor-pointer bg-[#DCDCDD] text-white" 
//                         onClick={""}
//                     >
//                     <p className="text-white font-pretendard font-medium">멤버 참여신청</p>
//                     </button>
//                 ) : (
//                     <button className="w-full h-11 mx-10 bg-linear-to-tr from-[#5679FE] to-[#3F91FF]/80 rounded-[10px] cursor-pointer"
//                         onClick={""}
//                     >
//                         <p className="text-white font-pretendard font-medium">멤버 참여신청</p>
//                     </button>
//                 )}
//             </div>
//         </div>
//     )
// }
import { useState, useEffect } from "react";
import { FetchGetAuth } from "../hook/Fetch";

export const POST = ({ title, label, user, onUserClick, roomId, ownerId, onClick, ...postProps }) => {
  const [userList, setUserList] = useState([]);
  const [myDiscordId, setMyDiscordId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMine = async () => {
      try {
        const res = await FetchGetAuth("/api/user/discord-id", null);
        const val = typeof res === "string" ? res : (res?.discordId ?? res?.data ?? "");
        setMyDiscordId(String(val ?? "").trim());
      } catch (e) {
        console.log("내 디코 아이디 조회 실패:", e);
        setMyDiscordId("");
      }
    };

    fetchMine();
  }, []);

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

    if (roomId) fetchParticipants();
    else setLoading(false);
  }, [roomId]);

  const isOwner = myDiscordId !== "" && String(myDiscordId) === String(ownerId);

  const exists =
    myDiscordId !== "" &&
    userList.some((p) => String(p.userDiscordId ?? "").trim() === String(myDiscordId));

  const isFull = user > 0 && userList.length >= user;

  const disabled = loading || isOwner || exists || isFull;

  return (
    <div
      className="flex flex-col justify-between items-center bg-white rounded-[20px] px-5 pt-4 pb-6 shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]"
      {...postProps}
    >
      <div className="w-full">
        <PostHeader title={title} label={label} user={user} onUserClick={onUserClick} />
      </div>

      <div className="w-full flex justify-center">
        <button
          disabled={disabled}
          className={`w-full h-11 mx-10 rounded-[10px] ${
            disabled ? "bg-[#DCDCDD] cursor-not-allowed" : "bg-linear-to-tr from-[#5679FE] to-[#3F91FF]/80 cursor-pointer"
          }`}
          onClick={disabled ? undefined : onClick}
        >
          <p className="text-white font-pretendard font-medium">
            {loading ? "불러오는 중..." : isOwner ? "방장입니다" : exists ? "이미 참여중" : isFull ? "정원 마감" : "멤버 참여신청"}
          </p>
        </button>
      </div>
    </div>
  );
};


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
                {user!==0 ? 
                (<p onClick={onUserClick} className="text-[#777B86] text-[14px] font-pretendard font-medium cursor-pointer">최대 {user}명까지 참가 가능</p>
                ) : (
                <p onClick={onUserClick} className="text-[#777B86] text-[14px] font-pretendard font-medium cursor-pointer">인원 제한 없음</p>
                )}
            </div>
        </div>
    )
}