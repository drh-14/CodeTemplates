import { Button } from '../../components/ui/button';
import TemplateListing from '../../components/ui/templateListing';
import Link from 'next/link';
export default function HomePage(){
    return(
        <div className = 'flex flex-col mt-4 gap-16 items-center'>
            <Button className = 'ml-auto mr-8'><Link href = "/profilePage">Your Profile</Link></Button>
            <TemplateListing templates = {["test", "test2", "test3"]}></TemplateListing>
            <Button><Link href = "/createTemplate">Create a New Template</Link></Button>
        </div>
    )
}