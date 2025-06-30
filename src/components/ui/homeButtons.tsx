'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Button } from './button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const handleSignOut =  async (router: AppRouterInstance) => {
        const response = await fetch("http://localhost:3000/logout", {
            method: "GET"
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
