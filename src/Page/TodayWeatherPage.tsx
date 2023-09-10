import '../Style/TodayWeatherPage.css';
import axios from "axios";
import React, {useState} from "react";
import {WeatherAllData} from "../API/Model";
import TodayWeatherList from "../Components/TodayWeatherList";
import {ForecastParams, todayWeatherForecast} from "../API/OpenMeteoAPI";


export default function TodayWeatherPage(){

    const [weathers, setWeathers] = useState<{[key: string]: WeatherAllData}>({});

    const fetchData = async ({latitude,longitude} : ForecastParams)=> {
        try{
            const newWeather = await todayWeatherForecast({latitude, longitude});
            const newWeatherKey = `${latitude},${longitude}`;
            interface KeyValueMap{
                [key:string] : WeatherAllData;
            }
            setWeathers(oldWeathers  => {
                const newWeathers : KeyValueMap= {
                    newWeather,
                    ...oldWeathers
                }
                newWeathers[newWeatherKey] = newWeather;
                console.log(newWeathers);
                return newWeathers;
            })
        }catch(e){
            console.log(e);
        }
    }
    React.useEffect( ()=>{
        try{
            fetchData({latitude: 22.27, longitude: 114.18});
            fetchData({latitude: -36.85, longitude: 174.76});
            fetchData({latitude: 35.69, longitude: 139.69});
            fetchData({latitude: 22.00, longitude: 79.00});
        }catch (e) {
            console.log(e);
        }
    },[])

    return(
        <div className={"page-content"}>
            <div className={"page-background"} />
            <TodayWeatherList weathersData = {weathers}/>
        </div>
    )
}