import '../Style/NavBar.css'
import NavBarOption from "./NavBarOption";
import {useState} from "react";

interface NavBarItem{
    title : string,
    callbackFunction : Function,
    id: string,
    position : string,
}

export default function NavBar(){

    const [selectedRow , setSelectedRow] = useState<string | null>(null);
    const navBarItems:NavBarItem[] = [
        {
            id: "home",
            title: "Home",
            callbackFunction: ()=>{
                console.log("home button clicked");
            },
            position: "left",
        },
        {
            id: "weathersPrediction",
            title:"Weathers Prediction",
            callbackFunction: ()=>{
                console.log("weather prediction button clicked");
            },
            position: "left",
        },
        {
            id: "settings",
            title: "Settings",
            callbackFunction: ()=>{
                console.log("settings");
            },
            position: "right",
        }
    ]

    const renderNavBarItem = (navBarItem:NavBarItem) => {
        return (
            <NavBarOption title={navBarItem.title} callbackFunction={
                ()=> {
                    navBarItem.callbackFunction();
                    setSelectedRow(navBarItem.id);
                }
            } selected={selectedRow === navBarItem.id}/>
        )
    }

    return(
        <div className={"navigation-bar"}>
            {navBarItems.filter(item=>item.position === "left").map(renderNavBarItem)}
            <div style={{flex: 1}} />
            {navBarItems.filter(item=>item.position === "right").map(renderNavBarItem)}
        </div>
    )
}