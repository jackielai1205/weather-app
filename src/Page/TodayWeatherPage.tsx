import '../Style/TodayWeatherPage.css';
import axios from "axios";
import React, {useState} from "react";
import WeatherData from "../Model/WeatherData";
import TodayWeatherList from "../Components/TodayWeatherList";
import {Skeleton} from "@mui/material";


export default function TodayWeatherPage(){

    const [weathers, setWeathers] = useState<{[key: string]: WeatherData}>({});
    const [isLoaded, setLoaded] = useState<boolean>(false);

    const hongKongUrl = "https://api.open-meteo.com/v1/forecast?latitude=22.27&longitude=114.18&hourly=temperature_" +
        "2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_" +
        "max&forecast_days=1&timezone=auto";
    const aucklandUrl = "https://api.open-meteo.com/v1/forecast?latitude=-36.85&longitude=174.76&hourly=temperature_" +
        "2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_" +
        "max&forecast_days=1&timezone=auto";
    const tokyoUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_" +
        "2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_" +
        "max&forecast_days=1&timezone=auto";
    const indiaUrl = "https://api.open-meteo.com/v1/forecast?latitude=22.00&longitude=79.00&hourly=temperature_" +
    "2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_" +
    "max&forecast_days=1&timezone=auto";

    const fetchData = async (url : string)=> {
        try{
            const weatherData = await axios.get(url);
            const newKey:string = weatherData.data.timezone_abbreviation;

            setWeathers(weathers => {
                console.log(weathers);
                const newWeathers = {
                    ...weathers,
                };
                newWeathers[newKey] = weatherData.data;
                return newWeathers;
            });
        }catch(e){
            console.log(e);
        }
    }

    React.useEffect( ()=>{
        try{
            fetchData(aucklandUrl);
            fetchData(hongKongUrl);
            fetchData(tokyoUrl);
            fetchData(indiaUrl);
        }catch (e) {
            console.log(e);
        }
    },[])

    return(
        <div className={"today-weather-page"}>
            <div className={"today-weather-page-background"} />
            <TodayWeatherList weathersData = {weathers}/>
        </div>
    )
}