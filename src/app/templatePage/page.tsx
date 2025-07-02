'use client'
import { Button } from '../../components/ui/button';
import CodeBox from '../../components/ui/codeBox';
import { useState, useEffect } from 'react';
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
    const [language, setLanguage] = useState("");

    useEffect(() => {
        const getCode = async () => {
            const response = await fetch(`http://localhost:8000/:${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if(response.status === 200){
                const data = await response.json();
                setValue(data);
            }
        }
        getCode();
    }, [id]);

    const saveChanges = async () => {
        try {
            const response = await fetch("http://localhost:8000/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, code: value, language: language})
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
            const response = await fetch(`http://localhost:8000/template/:${id}`, {
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
            <LanguageDropdown language = {language} setLanguage = {setLanguage}></LanguageDropdown>
            <Input className='w-1/4 border-2 border-black rounded-md' placeholder="Template Name" onChange={(e) => setName(e.target.value)}></Input>
            <CodeBox language = "java" value={value} setValue={setValue}></CodeBox>
            <Button onClick={saveChanges}>Save Changes</Button>
            <Button onClick={deleteTemplate}>Delete Template</Button>
        </div>
    )
}