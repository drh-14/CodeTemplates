'use client'
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';

export default function CodeBox(props: {language: string, value:string, setValue: Dispatch<SetStateAction<string>>}){
    const onChange = useCallback((val:string) => {
    console.log('val:', val);
    props.setValue(val);
  }, [props]);
    return(
        <div className = 'w-1/3 border-2 border-black border-solid p-2 rounded-sm h-1/3 overflow-y-auto max-h-180'>
            <CodeMirror theme = {themes.githubDark} className = 'w-full' value = {props.value} onChange = {onChange} extensions={[langs[props.language as keyof typeof langs]()]}></CodeMirror>
        </div>
    )
}