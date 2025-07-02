'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { handleSignOut } from '../../components/ui/homeButtons';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
    const router = useRouter();
    useEffect(() => {
        const verifyJWT = async () => {
            const response = await fetch('http://localhost:8000/jwt', {
                method: "GET",
                credentials: "include"
            });
            if(response.status === 401){
                router.push('/');
            }
        }
        verifyJWT();

    }, [router]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeEmail =  async () => {
        const response = await fetch("http://localhost:8000/email", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });
        if(response.status === 200){
            console.log("Email change successful.");
        }
    };
    const changeUsername = async () => {
        const response = await fetch("http://localhost:8000/username", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(username)
        });
        if(response.status === 200){
            console.log("Username changed successfully.");
        }
    };

    const changePassword = async () => {
        const response = await fetch("http://localhost:8000/password", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(password)
        });
        if(response.status === 200){
            console.log("Password changed successfully.");
        }
    };

    const deleteAccount = async () => {
        const response = await fetch("http://localhost:8000/user", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if(response.status === 200){
            console.log("Account successfully deleted.");
        }
    };

    return (
        <div className='flex flex-col items-center mt-4 gap-24'>
            <Button onClick = {() => handleSignOut(router)} className = 'ml-auto mr-12'>Sign Out</Button>
            <h1 className='text-5xl'>Welcome</h1>
            <div className='flex flex-col items-center gap-8'>
                <Dialog>
                    <DialogTrigger asChild><Button>Change Email</Button></DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <div className = 'flex flex-col gap-6'>
                        <Input onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter new email"></Input>
                        <Button onClick = {changeEmail}>Change Email</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button>Change Username</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <div className = 'flex flex-col gap-6'>
                                <Input onChange = {(e) => setUsername(e.target.value)} placeholder = "Enter new username"></Input>
                                <Button onClick = {changeUsername}>Change Username</Button>
                                </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button>Change Password</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <div className = 'flex flex-col gap-6'>
                                <Input onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter new password"></Input>
                                <Button onClick = {changePassword}>Change Password</Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button>Delete Account</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <div className = 'flex flex-col gap-6'>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <Button onClick = {deleteAccount}>Yes</Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}