import { Button } from '../../components/ui/button';
import TemplateListing from '../../components/ui/templateListing';
import { HomeButtons } from '../../components/ui/homeButtons';
import Link from 'next/link';
export default function HomePage(){
    return(
        <div className = 'flex flex-col mt-4 gap-16 items-center'>
            <HomeButtons></HomeButtons>
            <TemplateListing templates = {[{name: "test", id: "12345"}]}></TemplateListing>
            <Button><Link href = "/createTemplate">Create a New Template</Link></Button>
        </div>
    )
}