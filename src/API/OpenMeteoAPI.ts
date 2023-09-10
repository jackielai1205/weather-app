import axios from "axios";
import {FutureWeatherData, WeatherAllData} from "./Model";

interface ForecastParams {
    latitude : number,
    longitude : number
}

export async function futureWeatherForecast(params: ForecastParams): Promise<FutureWeatherData> {
    const {latitude, longitude} = params;
    return (await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude,
            longitude,
            daily: "weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
            timezone: "auto"
        }
    })).data;
}

export async function todayWeatherForecast(params: ForecastParams) : Promise<WeatherAllData>{
    const {latitude, longitude} = params;
    //https://api.open-meteo.com/v1/forecast?latitude=22.27&longitude=114.18&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_max&forecast_days=1&timezone=auto
    return(await axios.get("https://api.open-meteo.com/v1/forecast", {
        params:{
            latitude,
            longitude,
            hourly : "temperature_2m",
            daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_max",
            forecast_days: "1",
            timezone : "auto"
        }
    })).data;
}

export type {ForecastParams}