'use client'
import { Button } from '../../components/ui/button';
import CodeBox from '../../components/ui/codeBox';
import { useState, useEffect, Suspense } from 'react';
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import LanguageDropdown from '../../components/ui/languageDropdown';
export default function TemplatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [name, setName] = useState(searchParams.get('name') || "");
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState(searchParams.get('language') || "");
    const [nameError, setNameError] = useState("");
    const [languageError, setLanguageError] = useState("");

    useEffect(() => {
        const verifyJWT = async () => {
            const response = await fetch("http://localhost:8000/jwtClient", {
                method: "GET",
                credentials: "include"
            });
            if(response.status === 401){
                router.push('/');
            }
        };
        verifyJWT();
    }, [router]);

    useEffect(() => {
        const getCode = async () => {
            const response = await fetch(`http://localhost:8000/template/${id}`, {
                method: "GET",
                credentials: "include"
            });
            if(response.status === 200){
                const data = await response.json();
                setValue(data.code);
                setName(data.name);
                setLanguage(data.language);
            }
        }
        getCode();
    }, [id]);


    const saveChanges = async () => {
        try {
            setNameError("");
            setLanguageError("");
            if(name.length === 0){
                setNameError("Template name cannot be empty.");
            }
            if(language.length === 0){
                setLanguageError("Must select a language.");
            }
            if(!nameError  && !languageError){
                const response = await fetch(`http://localhost:8000/template/${id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, code: value, language: language})
            });
            if (response.status === 200) {
                router.push('/homePage');
            }
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const deleteTemplate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/template/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.status === 200) {
                router.push('/homePage');
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    function Fallback(){
        return <h1></h1>
    };

    return (
        <Suspense fallback = {<Fallback></Fallback>}>
        <div className='flex flex-col gap-8 items-center mt-24'>
            <LanguageDropdown language = {language} setLanguage = {setLanguage}></LanguageDropdown>
            {languageError ? <h1 className = 'text-red-600'>{languageError}</h1> : null}
            <Input value = {name} className='w-1/4 border-2 border-black rounded-md' placeholder="Template Name" onChange={(e) => setName(e.target.value)}></Input>
            {nameError ? <h1 className = 'text-red-600'>{nameError}</h1> : null}
            <CodeBox language = "java" value={value} setValue={setValue}></CodeBox>
            <Button onClick={saveChanges}>Save Changes</Button>
            <Button onClick={deleteTemplate}>Delete Template</Button>
        </div>
        </Suspense>
    )
}