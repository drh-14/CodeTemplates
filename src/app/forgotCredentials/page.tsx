'use client'
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function ForgotCredentials(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);
    const resetCredentials = async () => {
        setIsError(false);
        const res = await fetch("http://localhost:8000/resetCredentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email})
        });
        if(res.status !== 200){
            setIsError(true);
        }
        else{
            router.push('/');
        }
    };
    return(
        <div className = 'flex justify-center mt-24'>
            <div className = 'w-1/2 flex flex-col p-4 border-2 border-black border-solid rounded-md gap-8'>
            <h1>Enter the email registered under your account. An email will be sent to reset your login credentials.</h1>
            <Input onChange = {(e) => setEmail(e.target.value)} placeholder = "Email"></Input>
            <Button onClick = {resetCredentials}>Reset Credentials</Button>
            {isError ? <h1 className = 'text-red-500'>An error occurred.</h1>: null}
            </div>
            
        </div>
    )
}