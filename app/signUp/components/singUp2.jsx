'use client';
import { CIRCLE, INPUT, BUTTON } from "../../components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FetchPost } from "../../API/Fetch";

export const SignUp2 = ({ num, success, email }) => {
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    const handleCodeChange = (e) => {
        const valueC = e.target.value
        const rpC = valueC.replace(/[^0-9]/g, "");
        setCode(rpC);
    }

    const verifyCode = async () => {
        try {
            await FetchPost("/signup/verify-code", {
                email,
                verificationCode: code,
            })
            num(code);
            success(true);
        } catch {
            success(false);
        }
    }

    const codeValid = code.length === 6;

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
                        activate={false}
                        child={"1"}
                    />
                    <hr width={32} className="border border-[#777C89]" />
                    <CIRCLE
                        activate={true}
                        child={"2"}
                    />
                    <hr width={32} className="border border-[#777C89]" />
                    <CIRCLE
                        activate={false}
                        child={"3"}
                    />
                </div>
                <INPUT
                    label="인증번호"
                    type="text"
                    maxlength={6}
                    placeholder="인증번호를 입력해 주세요"
                    onChange={handleCodeChange}
                    value={code}
                />
                <BUTTON
                    label="다음"
                    activate={codeValid}
                    onClick={verifyCode}
                />
                <p className="text-center text-[#777C89] font-medium mb-15">이미 계정이 있으신가요? <a onClick={() => router.push("/login")} className="text-[#3290FF] underline cursor-pointer font-medium">로그인</a></p>
            </div>
        </div>
    )
}