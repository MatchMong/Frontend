'use client'
import { useEffect, useState } from "react";
import { FetchGet, FetchPost } from "../API/Fetch";

export default function UserList() {
    const [data, setData] = useState(["1,2"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchGet('/members');
                setData(result);
            } catch(error) {
                console.log("유저 목록 실패: " + error)
            }
        };

        fetchData();
    }, []);

    const sendDm = async(userId) => {
        await FetchPost(`/send-dm?userId=${encodeURIComponent(userId)}`, null);
    }

    return (
        <div>
            {data.map((userId) => {
                const match = userId.match(/\((\d+)\)/);
                const name = userId.match(/^(.+?)\s*\(/)?.[1];
                return (
                    <div key={match}>
                        <button onClick={() => {sendDm(match[1])}}>
                            {name}에게 dm보내기
                        </button>
                    </div>
                )
            })}
        </div>
    );
}