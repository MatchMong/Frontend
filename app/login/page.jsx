'use client';
import { useState } from "react";
import { INPUT } from "../components/input";
import { BUTTON } from "../components/button";
import { useRouter } from "next/navigation";

export default function LoginPage () {
    const [eyes, setEyes] = useState("/icon/offeyes.svg");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const router = useRouter();

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
            <div className="w-[524px] h-[574px] bg-white rounded-xl p-3.5">
                <img src="/icon/leftArrow.svg" alt="Arrow" width={42}/>
                <div className="w-full flex items-center justify-center">
                    <img src="/icon/M&M.svg" alt="M&M" width={210} />
                </div>
                <INPUT 
                    label="아이디"
                    type="text"
                    placeholder="아이디를 입력해주세요"
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
                />
                <BUTTON
                    label="로그인"
                    activate={true}
                />
                <p className="text-center text-[#777C89]">M&M가 처음이신가요? <a onClick={() => router.push("/signUp")} className="text-[#3290FF] underline cursor-pointer">회원가입</a></p>
                <p className="text-center text-[#777C89]"><a onClick={() => router.push("/findPassword")} className="cursor-pointer">비밀번호 찾기</a></p>
            </div>
        </div>
    );
}