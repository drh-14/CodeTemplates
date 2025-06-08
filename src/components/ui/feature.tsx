import Image from 'next/image';
export default function Feature(props:{text:string, imageUrl:string}){
    return(
        <div className = 'flex flex-col gap-8 items-center overflow-y-auto break-all w-1/3 text-center'>
            <h1 className = 'text-4xl'>{props.text}</h1>
            <Image src = {props.imageUrl} alt = "" width = {50} height = {50}></Image>
        </div>
    )
}