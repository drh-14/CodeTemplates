'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { langNames } from '@uiw/codemirror-extensions-langs';
import { Dispatch } from "react";

export default function LanguageDropdown(props: {language: string, setLanguage: Dispatch<React.SetStateAction<string>> }){
    return(
        <DropdownMenu>
                <DropdownMenuTrigger className = 'border-2 border-black border-solid p-2 rounded-md'>{props.language ? props.language : "Select Language"}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {(Array.from(langNames)).map((language) => <DropdownMenuItem key = {language} onClick = {() => props.setLanguage(language)}>
                        {language}
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
    )
}