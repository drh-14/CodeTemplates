import Feature from '../components/ui/feature';
import { Button } from '../components/ui/button'
import Link from 'next/link';
export default function Home() {
  return (
    <div className='flex flex-col gap-18 items-center h-screen mt-4'>
      <Button className = 'ml-auto mr-16'><Link href = "/signIn">Sign In</Link></Button>
      <h1 className='text-5xl'>Welcome to CodeTemplates</h1>
      <h1 className = 'text-3xl'>Your tool to create and save custom code templates.</h1>
      <div className = 'mt-72 items-center gap-36 flex flex-col text-center text-4xl'>
        <div className = 'flex gap-24'>
        <Feature width = {50} height = {50} text = "Create code templates in over 100 languages" imageUrl = "/images/languageListing.png"></Feature>
        <Feature width = {500} height = {500} text = "Develop and save code in an interactive code editor" imageUrl = "/images/codeEditor.png"></Feature>
      </div>
      <Button className = 'mb-12'><Link href = "/signUp">Get Started</Link></Button>
      </div>
    </div>
  );
}