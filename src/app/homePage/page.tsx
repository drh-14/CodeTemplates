import { Button } from '../../components/ui/button';
import TemplateListing from '../../components/ui/templateListing';
import { HomeButtons } from '../../components/ui/homeButtons';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function HomePage(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        redirect('/');
    }
    const verifyJwtResponse = await fetch("http://localhost:8000/jwtServer", {
        "method": "GET",
        headers: {
            'Authorization': token
        }
    });
    if(verifyJwtResponse.status === 401){
        redirect('/');
    }
    const response = await fetch("http://localhost:8000/templates", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    const data = await response.json();
    console.log(data);
    return(
        <div className = 'flex flex-col mt-4 gap-16 items-center'>
            <HomeButtons></HomeButtons>
            <TemplateListing templates = {data.map((x: ({id: string, name: string, language: string, userID: string, code: string})) => ({name: x.name, id: x.id, language: x.language}))}></TemplateListing>
            <Button><Link href = "/createTemplate">Create a New Template</Link></Button>
        </div>
    )
}