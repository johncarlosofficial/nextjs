import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session)
        return (
            <>
                <h1>Hello, {session.user.name}</h1>
                <Link href={"/api/auth/signout"}>Sign out</Link>
            </>
        );
    else
        return (
            <>
                <Link href={"/api/auth/signin"}>Sign in</Link>
            </>
        );
}
