
import { Suspense } from 'react';
import TemplatePageComponent from '../../components/templatePageComponent';
export default function TemplatePage(){
    function Fallback(){
        return <h1></h1>
    }

    return(
        <Suspense fallback = {<Fallback></Fallback>}>
            <TemplatePageComponent></TemplatePageComponent>
        </Suspense>

    )
}