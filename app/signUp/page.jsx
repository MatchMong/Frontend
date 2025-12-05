'use client';
import { SignUp1, SignUp2, SignUp3 } from "./components";
import { useState } from "react";

export default function SignUpPage() {
    const [next2, setNext2] = useState(true);
    const [next3, setNext3] = useState(true);

    return (
        <div>
            {!next2 ? (
                <SignUp1 />
            ) : !next3 ? (
                <SignUp2 />
            ) : (
                <SignUp3 />
            )}
        </div>
    )
}