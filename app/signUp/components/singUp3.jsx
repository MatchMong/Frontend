'use client';
import { CIRCLE, INPUT, BUTTON } from "../../components";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignUp3 = () => {
    const [eyes1, setEyes1] = useState("/icon/offeyes.svg");
    const [eyes2, setEyes2] = useState("/icon/offeyes.svg");
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [id, setId] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [password2Touched, setPassword2Touched] = useState(false);
    
    const router = useRouter();
    
    const passwordsMatch = password1 === password2 && password2.length > 0;
    const showError = password2Touched && password2.length > 0 && !passwordsMatch;
    
    const handleIdChange = (e) => {
        setId(e.target.value);
    }
    const handlePasswordChange1 = (e) => {
        setPassword1(e.target.value);
    }
    const handlePasswordChange2 = (e) => {
        setPassword2(e.target.value);
    }

    const showPassword1 = () => {
        if (eyes1 === "/icon/offeyes.svg") {
            setEyes1("/icon/openeyes.svg");
            setPasswordVisible1(true);

        } else {
            setEyes1("/icon/offeyes.svg");
            setPasswordVisible1(false);
        }
    }
    const showPassword2 = () => {
        if (eyes2 === "/icon/offeyes.svg") {
            setEyes2("/icon/openeyes.svg");
            setPasswordVisible2(true);

        } else {
            setEyes2("/icon/offeyes.svg");
            setPasswordVisible2(false);
        }
    }

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
                <INPUT
                    label="아이디"
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    onChange={handleIdChange}
                />
                <INPUT 
                    label="비밀번호"
                    type={passwordVisible1 ? "text" : "password"}
                    iconSrc={eyes1}
                    iconSize={28}
                    iconAsButton={true}
                    onIconClick={showPassword1}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={handlePasswordChange1}
                />
                <INPUT 
                    label="비밀번호"
                    type={passwordVisible2 ? "text" : "password"}
                    iconSrc={eyes2}
                    iconSize={28}
                    iconAsButton={true}
                    onIconClick={showPassword2}
                    error={showError}
                    errorMessage={"비밀번호가 틀렸습니다."}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={handlePasswordChange2}
                    onBlur={() => setPassword2Touched(true)}
                    value={password2}
                />
                <BUTTON
                    label="회원가입 완료"
                    activate={id && passwordsMatch}
                />
                <p className="text-center text-[#777C89] font-medium">이미 계정이 있으신가요? <a onClick={() => router.push("/login")} className="text-[#3290FF] underline cursor-pointer font-medium">로그인</a></p>
            </div>
        </div>
    )
}