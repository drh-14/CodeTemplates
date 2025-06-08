import { Input } from './input';
import { Button } from './button';

export default function SignInBox(){
    return(
        <div className = 'w-1/5 rounded-md border-2 border-black gap-8 flex flex-col gap-12 items-center p-4'>
            <Input placeholder = "Email"></Input>
            <Input placeholder = "Password"></Input>
            <Button>Sign Up</Button>
        </div>
    )
}