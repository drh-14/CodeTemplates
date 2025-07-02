import Link from 'next/link';
export default function TemplateBox(props: {name: string, id: string, language: string}){
    return(
        <Link href ={{pathname: "/templatePage", query: {name: props.name, id: props.id} }}>
            <h1 className = 'text-center'>{props.language}</h1>
        <button className = 'p-4 block border-2 border-black border-solid rounded-md break-all w-full text-center h-40' >
            {props.name}
        </button>
        </Link>
    )
}