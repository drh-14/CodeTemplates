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
        <Feature text = "testing123" imageUrl = "/1"></Feature>
        <Feature text = "testing123" imageUrl = "/1"></Feature>
        <Feature text = "testing123" imageUrl = "/1"></Feature>
      </div>
      <Button><Link href = "/signUp">Get Started</Link></Button>
      </div>
    </div>
  );
}