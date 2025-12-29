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
import { FetchDeleteAuth, FetchGetAuth } from "../../hook/Fetch";

export const UserList = ({ closeClick, roomId, roomTitle, nickname, ownerId }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myDiscordId, setMyDiscordId] = useState("");
  const [myDiscordUniqueId, setMyDiscordUniqueId] = useState("");

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
  const fetchMyUnique = async () => {
    try {
      const did = String(myDiscordId ?? "").trim();
      if (!did) {
        setMyDiscordUniqueId("");
        return;
      }

      const res = await FetchGetAuth("/api/members", null);
      const members = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);

      const [didName, didDisc] = did.includes("#") ? did.split("#") : [did, ""];

      const me = members.find((m) => {
        const u = String(m?.username ?? "").trim();
        const d = String(m?.discriminator ?? "").trim();
        if (!u) return false;
        if (!didDisc) return u === didName;
        return u === didName && d === didDisc;
      });

      const unique = String(me?.id ?? "").trim();
      setMyDiscordUniqueId(unique);
      console.log("[myDiscordUniqueId]", unique);
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

  const norm = (v) => String(v ?? "").trim();
  const isSnowflake = (v) => /^\d{15,20}$/.test(norm(v));

  const isOwner =
    (isSnowflake(ownerId) && isSnowflake(myDiscordUniqueId) && norm(ownerId) === norm(myDiscordUniqueId)) ||
    (norm(ownerId) !== "" && norm(myDiscordId) !== "" && norm(ownerId) === norm(myDiscordId));


const TrashClick = async (targetId) => {
  try {
    const raw = norm(targetId);

    let uniqueId = raw;

    if (!isSnowflake(raw)) {
      const res = await FetchGetAuth("/api/members", null);
      const members = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);

      const [name, disc] = raw.includes("#") ? raw.split("#") : [raw, ""];

      const me =
        members.find((m) => {
          const u = norm(m?.username);
          const d = norm(m?.discriminator);
          if (!u) return false;
          if (!disc) return u === name;
          return u === name && d === disc;
        }) ||
        members.find((m) => norm(m?.username).toLowerCase() === name.toLowerCase());

        uniqueId = norm(me?.id);
      }

      if (!isSnowflake(uniqueId)) {
        console.log("추방 실패: 고유 ID를 찾지 못함", { targetId, uniqueId });
        return;
      }

      await FetchDeleteAuth(`/api/rooms/${roomId}/participants/${encodeURIComponent(uniqueId)}`);

      setUserList((prev) =>
        prev.filter((u) => {
          const v = norm(u?.discordId ?? u?.userDiscordId ?? "");
          return v !== raw && v !== uniqueId;
        })
      );
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
                  key={u.nickname ?? u.discordId ?? idx}
                  user={u.nickname}
                  discordId={u.discordId}
                  onlyUser={isOwner}
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
  major,
  discordId,
  bg = "F5F7F9",
  cardP = 12,
  ml = 5,
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
      {onlyUser && (
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
            <p className={`text-[${nameText}px] font-medium font-pretendard`}>{user ?? discordId}</p>
            <p className="text-[#777B86] text-[14px] font-pretendard">{major ?? "무전공"}</p>
          </div>
        </div>
      )}

      {!onlyUser && (
        <div className="relative flex items-center p-[${cardP}px] w-full h-21 bg-[#${bg}] rounded-xl">
          <div className="relative flex justify-center items-center">
            <p className={`absolute text-white text-[${profileText}px] font-pretendard font-bold`}>
              {firstChar}
            </p>
            <img src="icon/userBg.svg" width={iconSize} />
          </div>

          <div className={`ml-${ml}`}>
            <p className={`text-[${nameText}px] font-medium font-pretendard`}>{user ?? discordId}</p>
            <p className={`text-[#777B86] text-[${specialtyText}px] font-pretendard`}>{major ?? "무전공"}</p>
          </div>
        </div>
      )}
    </>
  );
};
