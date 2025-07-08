'use client'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInBox() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleSignUp = async () => {
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        if (email.length === 0) {
            setEmailError("Email cannot be empty.");
        }
        if (username.length === 0) {
            setUsernameError("Username cannot be empty.");
        }
        if (password.length === 0) {
            setPasswordError("Password cannot be empty.");
        }
        if (!emailError && !usernameError && !passwordError) {
            const response = await fetch("https://code-templates.herokuapp.com/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, username: username, password: password})
            });
            if (response.status === 200) {
                router.push('/homePage');
            }
            else{
                const data = await response.json();
                if(data === "Username already in use"){
                    setUsernameError(data);
                }
            }
        }
    }
    return (
        <div className='w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-12 items-center p-4'>
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
            {emailError ? <h1 className = 'text-red-500'>{emailError}</h1> : null}
            <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username"></Input>
            {usernameError ? <h1 className = 'text-red-500'>{usernameError}</h1> : null}
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password"></Input>
            {passwordError ? <h1 className = 'text-red-500'>{passwordError}</h1> : null}
            <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
    )
}