'use client';
import { SignUp1, SignUp2, SignUp3, Agree } from "./components";
import { useEffect, useState } from "react";
import { FetchPost } from "../API/Fetch";

export default function SignUpPage() {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [agree, setAgree] = useState(true);
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [next2, setNext2] = useState(success1);
    const [next3, setNext3] = useState(success1 && success2);
    const [password, setPassword] = useState("");
    const [gisu, setGisu] = useState("");
    const [click1, setClick1] = useState(false);
    const [click2, setClick2] = useState(false);
    const [click3, setClick3] = useState(false);

    // useEffect(() => {
    //     if(click1 == false) return;
    //     const handleSignUp = async () => {
    //         try {
    //             await FetchPost("/signup/verify-code", {
    //                 selectedEmail,
    //             });
    //             setSuccess1(true);
    //         } catch (error) {
    //             console.log("회원가입 실패: " + error)
    //             setClick1(false);
    //         }
    //     }

    //     handleSignUp();
    // }, [click1])

    useEffect(() => {
        if(click3 == false) return;
        const handleSignUp = async () => {
            try {
                await FetchPost("/signup", {
                    selectedEmail,
                    password,
                });
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
                            success={setSuccess2}
                            email={selectedEmail}
                        />
                    ) : (
                        <SignUp3 
                            password={setPassword}
                            gisu={setGisu}
                            click={setClick3}
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