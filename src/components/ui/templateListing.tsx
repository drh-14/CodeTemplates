import TemplateBox from '../../components/ui/templateBox';
export default function TemplateListing(props: {templates : {name: string, id: string, language: string}[]}){
    return(
        <div className = 'flex flex-col gap-20 items-center'>
            <h1 className = 'text-5xl'>{props.templates.length > 0 ? "Your Templates" : "No Templates"}</h1>
            <div className = "grid [grid-template-columns:repeat(2,200px)] gap-4">
                {props.templates.map(template => <TemplateBox key = {template.id} name = {template.name} id = {template.id} language = {template.language}></TemplateBox>)}
            </div>
        </div>
    );
}