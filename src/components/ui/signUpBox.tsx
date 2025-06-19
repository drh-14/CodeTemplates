'use client'
import { Input } from './input';
import { Button } from './button';
import { useState } from 'react';
import axios from 'axios';
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
            const response = await axios.put("http://localhost:3000/signUp", { email: email, username: username, password: password });
            if (response.status === 200) {
                router.push('/homePage');
            }
            else{
                if(response.data === "Username already in use"){
                    setUsernameError(response.data);
                }
            }
        }
    }
    return (
        <div className='w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-12 items-center p-4'>
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
            {emailError ? <h1>{emailError}</h1> : null}
            <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username"></Input>
            {usernameError ? <h1>{usernameError}</h1> : null}
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password"></Input>
            {passwordError ? <h1>{passwordError}</h1> : null}
            <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
    )
}