'use client';
import { SignUp1, SignUp2, SignUp3 } from "./components";
import { useState } from "react";
import { FetchPost } from "../API/Fetch";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const next2 = success1;
    const next3 = success1 && success2;
    const [code, setCode] = useState("");

    const router = useRouter();

    const handleSignUp = () => {
        router.push("/login");
    }

    return (
        <div>
            {!next2 ? (
                <SignUp1
                    success={setSuccess1}
                    selectedEmail={setSelectedEmail}
                />
            ) : !next3 ? (
                <SignUp2
                    num={setCode}
                    success={setSuccess2}
                    selectedEmail={selectedEmail}
                />
            ) : (
                <SignUp3
                    click={handleSignUp}
                />
            )}
        </div>
    )
}