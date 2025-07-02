'use client'
import CodeBox from '../../components/ui/codeBox';
import { Button } from '../../components/ui/button';
import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import LanguageDropdown from '../../components/ui/languageDropdown';
export default function CreateTemplate(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("");
    const [value, setValue] = useState("");
    const [nameError, setNameError] = useState("");
    const [languageError, setLanguageError] = useState("");

    useEffect(() => {
        const verifyJWT = async () => {
            const response = await fetch("http://localhost:8000/jwt", {
                method: "GET",
                credentials: "include"
            });
            if(response.status === 401){
                router.push('/');
            }
        };
        verifyJWT();

    }, [router]);

    const createTemplate = async () => {
        try{
            setNameError("");
            setLanguageError("");
            if(name.length === 0){
                setNameError("Template name cannot be empty.");
            }
            if(language.length === 0){
                setLanguageError("Must select a language.");
            }
            if(!nameError && !languageError){
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
        }
        catch(error){
            console.error(error);
        }
    }
    return(
        <div className = 'flex flex-col items-center gap-8 mt-24'>
            <LanguageDropdown language = {language} setLanguage = {setLanguage}></LanguageDropdown>
            {languageError ? <h1 className = 'text-red-600'>{languageError}</h1> : null}
            <Input onChange = {(e) => setName(e.target.value)} className = 'w-1/4 border-2 border-black border-solid' placeholder = "Template Name"></Input>
            {nameError ? <h1 className = 'text-red-600'>{nameError}</h1> : null}
            <CodeBox language = {language} value = {value} setValue = {setValue}></CodeBox>
            <Button onClick = {createTemplate}>Create Template</Button>
        </div>
    )
}