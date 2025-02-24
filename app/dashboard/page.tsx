"use client"

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
            <p>Hi ${email}</p>
        </>
    )
}