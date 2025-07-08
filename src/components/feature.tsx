import Image from 'next/image';
export default function Feature(props:{text:string, imageUrl:string, width: number, height: number}){
    return(
        <div className = 'flex flex-col gap-8 items-center overflow-y-auto break-all text-center'>
            <h1 className = 'text-4xl'>{props.text}</h1>
            <Image src = {props.imageUrl} alt = "" width = {props.width} height = {props.height}></Image>
        </div>
    )
}