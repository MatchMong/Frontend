'use client';
import { SignUp1, SignUp2, SignUp3, Agree } from "./components";
import { useEffect, useState } from "react";
import { FetchPost } from "../hook/Fetch";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [agree, setAgree] = useState(false);
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const next2 = success1;
    const next3 = success1 && success2;
    const [password, setPassword] = useState("");
    const [click3, setClick3] = useState(false);
    const [code, setCode] = useState("");
    const [discordId, setDiscordId] = useState("")

    const router = useRouter();

    useEffect(() => {
        if(click3 == false) return;
        const handleSignUp = async () => {
            try {
                await FetchPost("/signup", {
                    email: selectedEmail,
                    password,
                    verificationCode: code,
                    discordId,
                });
                router.push("/login");
            } catch (error) {
                console.log("회원가입 실패: " + error)
                setClick3(false);
            }
        }

        handleSignUp();
    }, [click3])

    return (
        <>
            {agree ? <div>
                {<div>
                    {!next2 ? (
                        <SignUp1
                            success={setSuccess1}
                            selectedEmail={setSelectedEmail}
                        />
                    ) : !next3 ? (
                        <SignUp2
                            num={setCode}
                            success={setSuccess2}
                            email={selectedEmail}
                        />
                    ) : (
                        <SignUp3 
                            password={setPassword}
                            click={setClick3}
                            discordId={setDiscordId}
                        />
                    )}
                </div>}
            </div> : <div>
                {<div>
                    <Agree
                        agree={setAgree}
                    />
                </div>}
            </div>
            }
        </>
    )
}