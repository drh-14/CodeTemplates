'use client'
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function SignInBox(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleLogin = async () => {
        setUsernameError("");
        setPasswordError("");
        setError("");
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username: username, password: password})
        });
        const data = await response.json();
        console.log(data);
        if(response.status === 200){
            router.push('/homePage');
        }
        else{
            if(response.status === 401){
                if(data === "Invalid username."){
                    setUsernameError("Invalid username.");
                }
                else if(data === "Invalid password."){
                    setPasswordError("Invalid password.");
                }
                else{
                    setError("An error occurred.");
                }
            }
        }
    }
    return(
        <div className = 'w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-10 items-center p-4'>
            <Input onChange = {(e) => setUsername(e.target.value)} placeholder = "Username"></Input>
            {usernameError ? <h1 className='text-red-500'>{usernameError}</h1> : null}
            <Input onChange = {(e) => setPassword(e.target.value)} placeholder = "Password"></Input>
            {passwordError ? <h1 className='text-red-500'>{passwordError}</h1> : null}
            <Button onClick = {handleLogin}>Sign In</Button>
            {error ? <h1 className='text-red-500'>{error}</h1> : null}
            {error ? <h1>{error}</h1> : null}
            <div className = 'flex flex-col gap-4 text-md'>
                <button><Link href = "/forgotCredentials">Forgot Username?</Link></button>
                <button><Link href = "/forgotCredentials">Forgot Password?</Link></button>
            </div>
        </div>
    )
}