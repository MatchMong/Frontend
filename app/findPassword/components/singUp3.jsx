'use client';
import { CIRCLE, INPUT, BUTTON } from "../../components";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignUp3 = ({ click }) => {
    const [eyes1, setEyes1] = useState("/icon/offeyes.svg");
    const [eyes2, setEyes2] = useState("/icon/offeyes.svg");
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [password2Touched, setPassword2Touched] = useState(false);
    
    const router = useRouter();
    
    const passwordsMatch = password1 === password2 && password2.length > 0;
    const showError = password2Touched && password2.length > 0 && !passwordsMatch;

    const handleBack = () => {
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    const handleClick = () => {
        router.push("/login");
        click(true);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF]">
            <div className="w-[524px] h-auto bg-white rounded-xl p-3.5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
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
                        activate={false}
                        child={"2"}
                    />
                    <hr width={32} className="border border-[#777C89]" />
                    <CIRCLE
                        activate={true}
                        child={"3"}
                    />
                </div>
                <div className="flex flex-col bg-[#D9D9D9] rounded-xl p-5 mx-6 text-center mt-6 text-3xl font-bold">
                    <p>이메일로 임시 비밀번호가</p>
                    <p>전송되었습니다.</p>
                </div>
                <BUTTON
                    label="로그인 페이지로 이동"
                    activate={true}
                    onClick={() => handleClick()}
                />
            </div>
        </div>
    )
}