
interface Props{
    title : string
    callbackFunction : Function
    selected : boolean
}

export default function NavBarOption(props: Props){

    const title = props.title;
    const callbackFunction = props.callbackFunction;
    const selected = props.selected;

    return(
        <div className={selected ? "navigation-bar-item selected" : "navigation-bar-item"}
             onClick={()=> {callbackFunction()}}>
            <div className={"navigation-bar-item-text"}>{title}</div>
        </div>
    )
}