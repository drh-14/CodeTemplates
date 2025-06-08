'use client'
import { Button } from '../../components/ui/button';
export default function TemplatePage(){
    return(
        <div className = 'flex flex-col gap-8 items-center mt-24'>
            <Button>Save Changes</Button>
            <Button>Delete Template</Button>
        
        </div>
    )
}