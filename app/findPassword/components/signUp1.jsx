'use client';
import { CIRCLE, INPUT, BUTTON } from "../../components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FetchPost } from "../../hook/Fetch";

export const SignUp1 = ({ click, success, selectedEmail }) => {
    const [email, setEmail] = useState("");
    const isValidEmail = (value) => /^[^\s@]+@gsm\.hs\.kr$/.test(value);
    const router = useRouter();
    
    const handleBack = () => {
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const clickButton = async () => {
        selectedEmail(email);
        success(true);
        try {
            await FetchPost("/find-password/send-code", {
                email
            });
        }catch (error) {
            console.log("비밀번호 찾기 실패: " + error);
            success(false);
        }
    }

    const emailValid = isValidEmail(email);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF]">
            <div className="w-[524px] h-auto bg-white rounded-[36px] p-3.5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
                <img src="/icon/leftArrow.svg" alt="Arrow" width={42} onClick={handleBack}/>
                <div className="w-full flex items-center justify-center">
                    <img src="/icon/M&M.svg" alt="M&M" width={210} />
                </div>
                <p className="font-pretendard font-medium text-lg text-center mt-3">MatchMong과 함께 시작하세요</p>
                <div className="flex flex-row justify-center items-center gap-3 mt-6">
                    <CIRCLE
                        activate={true}
                        child={"1"}
                    />
                    <hr width={32} className="border border-[#777C89]" />
                    <CIRCLE
                        activate={false}
                        child={"2"}
                    />
                    <hr width={32} className="border border-[#777C89]" />
                    <CIRCLE
                        activate={false}
                        child={"3"}
                    />
                </div>
                <INPUT
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    onChange={handleEmailChange}
                />
                <BUTTON
                    label="인증번호 발송"
                    activate={emailValid}
                    onClick={clickButton}
                />
                <p className="text-center text-[#777C89] font-medium mb-15">이미 계정이 있으신가요? <a onClick={() => router.push("/login")} className="text-[#3290FF] underline cursor-pointer font-medium">로그인</a></p>
            </div>
        </div>
    )
}