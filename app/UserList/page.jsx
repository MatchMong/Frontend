'use client'
import { useEffect, useState } from "react";
import { FetchGetAuth, FetchPostAuth } from "../hook/Fetch";

export default function UserList() {
    const [data, setData] = useState([""]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchGetAuth('/members');
                setData(result);
            } catch(error) {
                console.log("유저 목록 실패: " + error)
            }
        };

        fetchData();
    }, []);

    const sendDm = async(userId) => {
        await FetchPostAuth("/send-dm", { userId: String(userId) });
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