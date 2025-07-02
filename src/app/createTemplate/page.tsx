'use client'
import CodeBox from '../../components/ui/codeBox';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import LanguageDropdown from '../../components/ui/languageDropdown';
export default function CreateTemplate(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("");
    const [value, setValue] = useState("testing");
    const createTemplate = async () => {
        try{
            const response = await fetch("http://localhost:8000/template", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: name, code: value, language: language})
            });
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
            <LanguageDropdown language = {language} setLanguage = {setLanguage}></LanguageDropdown>
            <Input onChange = {(e) => setName(e.target.value)} className = 'w-1/4 border-2 border-black border-solid' placeholder = "Template Name"></Input>
            <CodeBox language = {language} value = {value} setValue = {setValue}></CodeBox>
            <Button onClick = {createTemplate}>Create Template</Button>
        </div>
    )
}