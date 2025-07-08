import { Suspense } from 'react';
import ResetCredentials from '../../components/ui/resetCredentials';

export default function ResetCredentialsPage(){
    function Fallback(){
        return <h1></h1>
    }

    return(
        <Suspense fallback = {<Fallback></Fallback>}>
            <ResetCredentials></ResetCredentials>
        </Suspense>
        
    )
}