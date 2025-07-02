import { Button } from '../../components/ui/button';
import TemplateListing from '../../components/ui/templateListing';
import { HomeButtons } from '../../components/ui/homeButtons';
import Link from 'next/link';
import { redirect } from "next/navigation";
export default async function HomePage(){
    const verifyJwtResponse = await fetch("http://localhost:8000/jwt", {
        "method": "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(verifyJwtResponse.status === 401){
        redirect('/');
    }
    //const response = await fetch("http://localhost:8000/templates", {
       // method: "GET",
        //headers: {
           // "Content-Type": "application/json"
        //}
    //});
   // const data = await response.json();
    return(
        <div className = 'flex flex-col mt-4 gap-16 items-center'>
            <HomeButtons></HomeButtons>
            <TemplateListing templates = {[{name: "test", id: "12345", language: "Java"}]}></TemplateListing>
            <Button><Link href = "/createTemplate">Create a New Template</Link></Button>
        </div>
    )
}