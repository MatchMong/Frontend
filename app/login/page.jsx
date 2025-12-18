'use client';
import { useState } from "react";
import { INPUT, BUTTON } from "../components/";
import { useRouter } from "next/navigation";
import { FetchPost } from "../API/Fetch";

export default function LoginPage () {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [eyes, setEyes] = useState("/icon/offeyes.svg");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    const changeId = (e) => {
        const valueI = e.target.value;
        const rpI = valueI.replace(/[^a-zA-Z0-9]/g, "");
        setId(rpI);
    }
    const changePassword = (e) => {
        const valueP = e.target.value;
        const rpP = valueP.replace(/[^a-zA-Z0-9!-)]/g, "");
        setPassword(rpP);
    }

    const handleLogin = async () => {
        await FetchPost("/login", {
            id,
            password,
        });
    }

    const showPassword = () => {
        if (eyes === "/icon/offeyes.svg") {
            setEyes("/icon/openeyes.svg");
            setPasswordVisible(true);

        } else {
            setEyes("/icon/offeyes.svg");
            setPasswordVisible(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF]">
            <div className="w-[524px] h-[574px] bg-white rounded-xl p-3.5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
                <img src="/icon/leftArrow.svg" alt="Arrow" width={42} onClick={handleBack}/>
                <div className="w-full flex items-center justify-center">
                    <img src="/icon/M&M.svg" alt="M&M" width={210} />
                </div>
                <INPUT 
                    label="아이디"
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    value={id}
                    onChange={(e) => changeId(e)}
                />
                <INPUT 
                    label="비밀번호"
                    type={passwordVisible ? "text" : "password"}
                    iconSrc={eyes}
                    iconSize={28}
                    iconAsButton={true}
                    onIconClick={showPassword}
                    error={loginError}
                    errorMessage={"비밀번호가 틀렸습니다."}
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => changePassword(e)}
                />
                <BUTTON
                    label="로그인"
                    activate={true}
                    onClick={handleLogin}
                />
                <p className="text-center text-[#777C89]">M&M가 처음이신가요? <a onClick={() => router.push("/signUp")} className="text-[#3290FF] underline cursor-pointer">회원가입</a></p>
                <p className="text-center text-[#777C89]"><a onClick={() => router.push("/findPassword")} className="cursor-pointer">비밀번호 찾기</a></p>
            </div>
        </div>
    );
}