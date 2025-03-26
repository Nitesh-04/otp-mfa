"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home()
{   
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) setEmail(storedEmail);
      }, []);

    return (
        <>
            <p>Hi {email}</p>
            <p><Link href={"/login"}>Sign Out</Link></p>
        </>
    )
}