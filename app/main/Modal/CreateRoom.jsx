import { INPUT } from "../../components"
import { useState, useEffect } from "react"
import { FetchPostAuth, FetchGetAuth } from "../../hook/Fetch"

export const CreateRoom = ({
    closeClick,
    success,
}) => {
    const [roomtitle, setRoomtitle] = useState("");
    const [roomcount, setRoomcount] = useState("");
    const [roomwrite, setRoomwrite] = useState("");
    const [discordId, setDiscordId] = useState("");
    const [discordUniqueId, setDiscordUniqueId] = useState("");

    const MAX_DESC = 50;

    const refreshPage = () => window.location.reload();

    const norm = (v) => String(v ?? "").trim();
    const toArray = (res) => (Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : []);

    useEffect(() => { 
        const dId = async() => { 
            try { 
                const res = await FetchGetAuth("/api/user/discord-id", null); 
                const v = typeof res === "string" ? res : (res?.data ?? res?.discordId ?? "");
                setDiscordId(norm(v));
            } catch (error) { 
                console.log("디스코드 아이디 불러오기 실패: " + error) 
            } 
        }
        
        dId(); 
    }, []);

    useEffect(() => {
  const fetchUniqueId = async () => {
    try {
      const did = String(discordId ?? "").trim();
      if (!did) {
        setDiscordUniqueId("");
        console.log("[discordUniqueId] discordId 비어있음 -> ''");
        return;
      }
      const res = await FetchGetAuth("/api/members", null);
      const members = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
      const [didName, didDisc] = did.includes("#") ? did.split("#") : [did, ""];
      const me = members.find((m) => {
        const u = String(m?.username ?? "").trim();
        const d = String(m?.discriminator ?? "").trim();
        if (!u || !d) return false;
        if (!didDisc) return u === didName;
        return u === didName && d === didDisc;
      });

      const unique = String(me?.id ?? "").trim();
      setDiscordUniqueId(unique);
    } catch (error) {
      console.log("멤버 고유 아이디 불러오기 실패:", error);
      setDiscordUniqueId("");
    }
  };

  fetchUniqueId();
}, [discordId]);


    const onRoomCountChange = (e) => {
        const onlyDigits = e.target.value.replace(/\D/g, "");
        setRoomcount(onlyDigits);
    };

    const onRoomWriteChange = (e) => {
        setRoomwrite(e.target.value.slice(0, MAX_DESC));
    };

    const handleCreateRoom = async () => {
        try {
            const parsed = Number(roomcount);
            const maxParticipants =
            roomcount == null || roomcount === "" || !Number.isFinite(parsed) || parsed === 0
                ? 999
                : parsed;
            await FetchPostAuth("/api/rooms", {
                roomtitle,
                maxParticipants,
                roomwrite,
                discordId: discordUniqueId,
            });
                success(true);
                refreshPage();

        } catch (error) {
            console.log("방 생성 실패: " + error);
        }
    };

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
                        value={roomtitle}
                        onChange={(e) => setRoomtitle(e.target.value)}
                    />
                    <INPUT
                        label={"팀 최대 인원 수"}
                        labelColor={"777B86"}
                        value={roomcount}
                        inputMode="numeric"
                        onChange={onRoomCountChange}
                    />
                    <INPUT
                        label={"팀 설명"}
                        labelColor={"777B86"}
                        value={roomwrite}
                        maxlength={50}
                        rightInnerText={`${roomwrite.length}/50`}
                        onChange={onRoomWriteChange}
                    />
                    <div className="w-[calc(100%-48px)] m-6 text-white text-xl font-medium font-pretendard">
                        {roomtitle.trim() && roomwrite.trim() ? (
                            <button className="w-full h-15 bg-[#5570FF] rounded-xl"
                                onClick={handleCreateRoom}
                            >
                                생성하기
                            </button>
                        ) : (
                            <button className="w-full h-15 rounded-xl bg-[#DCDCDD] text-white text-xl">
                                생성하기
                            </button>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}