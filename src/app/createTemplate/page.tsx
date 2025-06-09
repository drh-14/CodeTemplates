'use client'
import CodeBox from '../../components/ui/codeBox';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function CreateTemplate(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [value, setValue] = useState("testing");
    const createTemplate = async () => {
        try{
            const response = await axios.put("http://localhost:3000/template", {name: name, value: value});
            if(response.status === 200){
                router.push('/homePage');
            }
        }
        catch(error){
            console.error(error);
        }
    }
    return(
        <div className = 'flex flex-col items-center gap-8 mt-24'>
            <Input onChange = {(e) => setName(e.target.value)} className = 'w-1/4 border-2 border-black border-solid' placeholder = "Template Name"></Input>
            <CodeBox value = {value} setValue = {setValue}></CodeBox>
            <Button onClick = {createTemplate}>Create Template</Button>
        </div>
    )
}