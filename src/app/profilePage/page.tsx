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
import { handleSignOut } from '../../components/homeButtons';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
    const [changeUsernameOpen, setChangeUsernameOpen] = useState(false);
    const [changeEmailOpen, setChangeEmailOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const verifyJWT = async () => {
            const response = await fetch('http://localhost:8000/jwtClient', {
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
            body: JSON.stringify({email: email})
        });
        if(response.status === 200){
            console.log("Email change successful.");
            setChangeEmailOpen(false);
        }
    };
    const changeUsername = async () => {
        const response = await fetch("http://localhost:8000/username", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username})
        });
        if(response.status === 200){
            console.log("Username changed successfully.");
            setChangeUsernameOpen(false);
        }
    };

    const changePassword = async () => {
        const response = await fetch("http://localhost:8000/password", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password: password})
        });
        if(response.status === 200){
            console.log("Password changed successfully.");
            setChangePasswordOpen(false);
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
            router.push('/');
        }
    };

    return (
        <div className='flex flex-col items-center mt-4 gap-24'>
            <Button onClick = {() => handleSignOut(router)} className = 'ml-auto mr-12'>Sign Out</Button>
            <h1 className='text-5xl'>Welcome</h1>
            <div className='flex flex-col items-center gap-8'>
                <Dialog open = {changeEmailOpen}>
                    <DialogTrigger asChild><Button onClick = {() => setChangeEmailOpen(true)}>Change Email</Button></DialogTrigger>
                    <DialogContent onInteractOutside={() => setChangeEmailOpen(false)}>
                        <DialogTitle></DialogTitle>
                        <div className = 'flex flex-col gap-6'>
                        <Input onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter new email"></Input>
                        <Button onClick = {changeEmail}>Change Email</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog open = {changeUsernameOpen}>
                    <DialogTrigger asChild><Button onClick = {() => setChangeUsernameOpen(true)}>Change Username</Button></DialogTrigger>
                    <DialogContent onInteractOutside={() => setChangeUsernameOpen(false)}>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <div className = 'flex flex-col gap-6'>
                                <Input onChange = {(e) => setUsername(e.target.value)} placeholder = "Enter new username"></Input>
                                <Button onClick = {changeUsername}>Change Username</Button>
                                </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog open = {changePasswordOpen}>
                    <DialogTrigger asChild><Button onClick = {() => setChangePasswordOpen(true)}>Change Password</Button></DialogTrigger>
                    <DialogContent onInteractOutside={() => setChangePasswordOpen(false)}>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <div className = 'flex flex-col gap-6'>
                                <Input onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter new password"></Input>
                                <Button onClick = {changePassword}>Change Password</Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog open = {deleteAccountOpen}>
                    <DialogTrigger asChild><Button onClick = {() => setDeleteAccountOpen(true)}>Delete Account</Button></DialogTrigger>
                    <DialogContent onInteractOutside={() => setDeleteAccountOpen(false)}>
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