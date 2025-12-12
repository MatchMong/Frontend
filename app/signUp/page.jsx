'use client';
import { SignUp1, SignUp2, SignUp3 } from "./components";
import { useState } from "react";

export default function SignUpPage() {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [next2, setNext2] = useState(success1);
    const [next3, setNext3] = useState(success1 && success2);

    return (
        <div>
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
                <SignUp3 />
            )}
        </div>
    )
}