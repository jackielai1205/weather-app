import FutureWeatherCard from "./FutureWeatherCard";
import {FutureWeatherData} from "../API/Model";

interface Props{
    futureWeatherData : FutureWeatherData
}

export default function FutureWeatherList(props : Props){

    const futureWeatherData = props.futureWeatherData;

    return(
        <div className={"future-weather-list"}>
            {Object.keys(futureWeatherData.daily.time).map((key:string , index:number)=>{
                return <FutureWeatherCard key={key} futureWeatherData={futureWeatherData} currentIndex={index}/>
            })}
            {/*{Object.keys(futureWeatherData).map((key : string, index: number)=>{*/}
            {/*    return(*/}
            {/*        <FutureWeatherCard key={key} currentIndex={index} futureWeatherData={futureWeatherData}/>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    )
}