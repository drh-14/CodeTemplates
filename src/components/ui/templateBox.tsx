import Link from 'next/link';
export default function TemplateBox(props: {name: string}){
    return(
        <Link href = "/templatePage">
        <button className = 'p-4 block border-2 border-black border-solid rounded-md break-all w-full text-center h-40' >
            {props.name}
        </button>
        </Link>
    )
}