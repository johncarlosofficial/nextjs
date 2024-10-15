import Link from "next/link";
import React from "react";

export default function Page() {
    return (
        <>
            <h1>Hello, Next.js!</h1>
            <Link href={"/signin"}>
                <h2>Sign In</h2>
            </Link>
            <Link href={"/signup"}>
                <h2>Sign Up</h2>
            </Link>
        </>
    );
}
