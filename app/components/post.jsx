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

export const POST = ({ title, label, user, onUserClick, roomId, ownerId, onClick, hidden, ...postProps }) => {
  const [userList, setUserList] = useState([]);
  const [myDiscordId, setMyDiscordId] = useState("");          // username 또는 username#tag
  const [myDiscordUniqueId, setMyDiscordUniqueId] = useState(""); // 숫자 snowflake
  const [loading, setLoading] = useState(true);
  

  const norm = (v) => String(v ?? "").trim();
  const isSnowflake = (v) => /^\d{15,20}$/.test(norm(v));

  useEffect(() => {
    const fetchMine = async () => {
      try {
        const res = await FetchGetAuth("/api/user/discord-id", null);
        const val = typeof res === "string" ? res : (res?.discordId ?? res?.data ?? "");
        setMyDiscordId(norm(val));
      } catch (e) {
        console.log("내 디코 아이디 조회 실패:", e);
        setMyDiscordId("");
      }
    };

    fetchMine();
  }, []);

  // ✅ 내 username -> 내 고유ID(snowflake)로 변환
  useEffect(() => {
    const fetchMyUnique = async () => {
      try {
        const did = norm(myDiscordId);
        if (!did) {
          setMyDiscordUniqueId("");
          return;
        }

        const res = await FetchGetAuth("/api/members", null);
        const members = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);

        const [didName, didDisc] = did.includes("#") ? did.split("#") : [did, ""];

        const me = members.find((m) => {
          const u = norm(m?.username);
          const d = norm(m?.discriminator);
          if (!u || !d) return false;
          if (!didDisc) return u === didName;
          return u === didName && d === didDisc;
        });
      } catch (e) {
        console.log("내 디코 고유ID 조회 실패:", e);
        setMyDiscordUniqueId("");
      }
    };

    fetchMyUnique();
  }, [myDiscordId]);

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

  // ✅ ownerId(숫자) vs myDiscordUniqueId(숫자)
  const isOwner =
    isSnowflake(ownerId) &&
    isSnowflake(myDiscordUniqueId) &&
    norm(ownerId) === norm(myDiscordUniqueId);

  const myKeys = [myDiscordUniqueId, myDiscordId].map(norm).filter(Boolean);
  const exists =
  myKeys.length > 0 &&
  userList.some((p) => {
    const key = norm(p?.userDiscordId ?? p?.discordId ?? p?.id ?? "");
    return myKeys.includes(key);
  });

  const isFull = user > 0 && userList.length >= user;

  const disabled = loading || isOwner || exists || isFull;

  return (
    <div className={`flex flex-col justify-between items-center bg-white rounded-[20px] px-5 pt-4 pb-6 shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)] ${hidden}`} {...postProps}>
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
                {user!==0 || user!==999 ? 
                (<p onClick={onUserClick} className="text-[#777B86] text-[14px] font-pretendard font-medium cursor-pointer">최대 {user}명까지 참가 가능</p>
                ) : (
                <p onClick={onUserClick} className="text-[#777B86] text-[14px] font-pretendard font-medium cursor-pointer">인원 제한 없음</p>
                )}
            </div>
        </div>
    )
}