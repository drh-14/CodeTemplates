import { Input } from './input';
import { Button } from './button';
import Link from 'next/link';
export default function SignInBox(){
    return(
        <div className = 'w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-12 items-center p-4'>
            <Input placeholder = "Email"></Input>
            <Input placeholder = "Password"></Input>
            <Button>Sign In</Button>
            <div className = 'flex flex-col gap-4 text-md'>
                <button><Link href = "/forgotCredentials">Forgot Username?</Link></button>
                <button><Link href = "/forgotCredentials">Forgot Password?</Link></button>
            </div>
        </div>
    )
}