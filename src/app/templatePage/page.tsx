'use client'
import { Button } from '../../components/ui/button';
import CodeBox from '../../components/ui/codeBox';
import { useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
export default function TemplatePage(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [value, setValue] = useState("testing");
    const saveChanges = async () => {
        try{
            const response = await axios.post("http://localhost:3000/template", {name: name, value: value});
            if(response.status === 200){
                router.push('/homePage');
            }
        }
        catch(error){
            console.error(error);
        }
    };
    const deleteTemplate = async () => {
        try{
            const response = await axios.delete("http://localhost:3000/template");
            if(response.status === 200){
                router.push('/homePage');
            }
        }
        catch(error){
            console.error(error);
        }
    };
    return(
        <div className = 'flex flex-col gap-8 items-center mt-24'>
            <Input className = 'w-1/4 border-2 border-black rounded-md' placeholder = "Template Name" onChange = {(e) => setName(e.target.value)}></Input>
            <CodeBox value = {value} setValue = {setValue}></CodeBox>
            <Button onClick = {saveChanges}>Save Changes</Button>
            <Button onClick = {deleteTemplate}>Delete Template</Button>
        </div>
    )
}