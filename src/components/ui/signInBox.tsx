'use client'
import { Input } from './input';
import { Button } from './button';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function SignInBox(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {
        const response = await axios.post("http://localhost:3000/login", {username: username, password: password});
        if(response.status === 200){
            router.push('/homePage');
        }
        else{
            if(response.data === "Invalid username and invalid password"){
                setError("Invalid username or password.");
            }
        }
    }
    return(
        <div className = 'w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-12 items-center p-4'>
            <Input onChange = {(e) => setUsername(e.target.value)} placeholder = "Username"></Input>
            <Input onChange = {(e) => setPassword(e.target.value)} placeholder = "Password"></Input>
            <Button onClick = {handleLogin}>Sign In</Button>
            {error ? <h1>{error}</h1> : null}
            <div className = 'flex flex-col gap-4 text-md'>
                <button><Link href = "/forgotCredentials">Forgot Username?</Link></button>
                <button><Link href = "/forgotCredentials">Forgot Password?</Link></button>
            </div>
        </div>
    )
}