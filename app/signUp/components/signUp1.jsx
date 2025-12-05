'use client';
import { CIRCLE, INPUT, BUTTON } from "../../components";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignUp1 = () => {
    const [email, setEmail] = useState("");
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const emailValid = isValidEmail(email);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF]">
            <div className="w-[524px] h-auto bg-white rounded-xl p-3.5">
                <img src="/icon/leftArrow.svg" alt="Arrow" width={42}/>
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
                />
                <p className="text-center text-[#777C89] font-medium mb-15">이미 계정이 있으신가요? <a onClick={() => router.push("/login")} className="text-[#3290FF] underline cursor-pointer font-medium">로그인</a></p>
            </div>
        </div>
    )
}