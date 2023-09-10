import {useEffect, useState} from "react";
import "../Style/Page.css";
import {FutureWeatherData} from "../API/Model";
import FutureWeatherList from "../Components/FutureWeatherList";
import {ForecastParams, futureWeatherForecast} from "../API/OpenMeteoAPI";

export default function FutureWeatherPage(){

    const [weatherData, setWeatherData] = useState<{[key:string] : FutureWeatherData}>({})

    const fetchData = async({latitude, longitude} : ForecastParams)=>{
        try{
            const newWeather = await futureWeatherForecast({latitude: latitude, longitude: longitude});
            setWeatherData(oldWeathers => {
                interface KeyValueMap {
                    [key: string]: FutureWeatherData,
                }
                const key:string = `${latitude},${longitude}`
                const newData : KeyValueMap = {};
                newData[key] = newWeather
                console.log(newData);
                return newData
            })
        }catch{
            console.error("Can't fetch Weather");
        }

    }

    useEffect(()=>{
        fetchData({latitude: 22.2883, longitude: 114.1747});
    },[])

    if(Object.keys(weatherData).length > 0){
        return(
            <div className={"page-content"}>
                <div className={"page-background"}/>
                {Object.keys(weatherData).map((key:string)=>{
                    return <FutureWeatherList key={key} futureWeatherData={weatherData[key]}/>
                })}
            </div>
        )
    }
    return(
        <div className={"page-content"}>
            <div className={"page-background"}/>
            Empty
        </div>
    )
}