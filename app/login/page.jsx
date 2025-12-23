'use client';
import { useState, useEffect } from "react";
import { INPUT, BUTTON } from "../components/";
import { useRouter } from "next/navigation";
import { FetchPost } from "../API/Fetch";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eyes, setEyes] = useState("/icon/offeyes.svg");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [click, setClick] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const router = useRouter();

    const isValidEmail = (value) => /^[^\s@]+@gsm\.hs\.kr$/.test(value);
    const emailValid = isValidEmail(email);

    useEffect(() => {
        if(click == false) return;
        const handleLogin = async () => {
            try {
                await FetchPost("/login", {
                    email,
                    password,
                });
                router.push("/main");
            } catch (error) {
                console.log("로그인 실패: " + error);
                setLoginError(true);
                setClick(false);
            }
        }

        handleLogin();
    }, [click])
    
    const handleBack = () => {
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const changePassword = (e) => {
        const valueP = e.target.value;
        const rpP = valueP.replace(/[^a-zA-Z0-9!-)]/g, "");
        setPassword(rpP);
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
            <div className="w-[524px] h-[574px] bg-white rounded-[36px] p-3.5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
                <img src="/icon/leftArrow.svg" alt="Arrow" width={42} onClick={handleBack}/>
                <div className="w-full flex items-center justify-center">
                    <img src="/icon/M&M.svg" alt="M&M" width={210} />
                </div>
                <INPUT 
                    label="이메일"
                    type="text"
                    placeholder="이메일를 입력해주세요"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                />
                <INPUT 
                    label="비밀번호"
                    type={passwordVisible ? "text" : "password"}
                    iconSrc={eyes}
                    iconSize={28}
                    iconAsButton={true}
                    onIconClick={showPassword}
                    error={loginError}
                    errorMessage={"이메일 또는 비밀번호가 틀렸습니다."}
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => changePassword(e)}
                />
                <BUTTON
                    label="로그인"
                    activate={emailValid}
                    onClick={() => setClick(true)}
                />
                <p className="text-center text-[#777C89]">M&M가 처음이신가요? <a onClick={() => router.push("/signUp")} className="text-[#3290FF] underline cursor-pointer">회원가입</a></p>
                <p className="text-center text-[#777C89]"><a onClick={() => router.push("/findPassword")} className="cursor-pointer">비밀번호 찾기</a></p>
            </div>
        </div>
    );
}