'use client'
import { Button } from '../../components/ui/button';
import CodeBox from '../../components/ui/codeBox';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function TemplatePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const saveChanges = async () => {
        try {
            const response = await fetch("http://localhost:8000/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, code: value })
            });
            if (response.status === 200) {
                router.push('/homePage');
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    const deleteTemplate = async () => {
        try {
            const response = await fetch("http://localhost:8000/template", {
                method: "DELETE"
            });
            if (response.status === 200) {
                router.push('/homePage');
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='flex flex-col gap-8 items-center mt-24'>
            <DropdownMenu>
                <DropdownMenuTrigger>Select Language</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Java</DropdownMenuItem>
                    <DropdownMenuItem>JavaScript</DropdownMenuItem>
                    <DropdownMenuItem>Python</DropdownMenuItem>
                    <DropdownMenuItem>Go</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Input className='w-1/4 border-2 border-black rounded-md' placeholder="Template Name" onChange={(e) => setName(e.target.value)}></Input>
            <CodeBox value={value} setValue={setValue}></CodeBox>
            <Button onClick={saveChanges}>Save Changes</Button>
            <Button onClick={deleteTemplate}>Delete Template</Button>
        </div>
    )
}