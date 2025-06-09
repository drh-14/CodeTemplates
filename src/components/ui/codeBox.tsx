'use client'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, Dispatch, SetStateAction } from 'react';

export default function CodeBox(props: {value:string, setValue: Dispatch<SetStateAction<string>>}){
    const onChange = useCallback((val:string) => {
    console.log('val:', val);
    props.setValue(val);
  }, [props]);
    return(
        <div className = 'w-1/3 border-2 border-black border-solid p-4 rounded-md h-1/3 overflow-y-auto max-h-180'>
            <CodeMirror className = 'w-full' value = {props.value} onChange = {onChange} extensions={[javascript({ jsx: true})]}></CodeMirror>
        </div>
    )
}