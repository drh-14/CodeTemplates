'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const token = localStorage.getItem("jwt")!;

const handleSignOut =  async (router: AppRouterInstance) => {
        const response = await fetch("https://code-templates-7eaeb796712f.herokuapp.com/logout", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
        if(response.status === 200){
            router.push('/');
        }
    }

 function HomeButtons(){
    const router = useRouter();
    return(
        <div className = 'ml-auto mr-8 flex gap-4'>
            <Button><Link href = "/profilePage">Your Profile</Link></Button>
                <Button onClick = {() => handleSignOut(router)}>Sign Out</Button>
        </div>
    )
}

export { HomeButtons, handleSignOut };
