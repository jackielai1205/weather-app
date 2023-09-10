import '../Style/FutureWeather.css'
import {FutureWeatherData} from "../API/Model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSun,
    faCloudSun,
    faCloud,
    faCloudSunRain,
    faCloudRain,
    faSnowflake,
    faCloudShowersHeavy,
    faBolt,
    faBoltLightning,
    faCloudBolt,
    faCloudShowersWater
} from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";


interface Props{
    futureWeatherData : FutureWeatherData
    currentIndex : number
}

interface WeatherType{
    weatherDescription : string
    weatherIcon : IconDefinition | null
}

export default function FutureWeatherCard(props: Props){

    const convertWeatherType = function(weatherCode:number) : WeatherType{

        let weatherDescription : string;
        let weatherIcon : IconDefinition | null;

        try{
            switch(weatherCode){
                case 0:
                    weatherDescription = "Clear sky";
                    weatherIcon = faSun;
                    break;
                case 1:
                    weatherDescription = "Mainly clear";
                    weatherIcon = faSun;
                    break;
                case 2:
                    weatherDescription = "Partly cloudy";
                    weatherIcon = faCloudSun;
                    break;
                case 3:
                    weatherDescription = "Overcast";
                    weatherIcon = faCloud;
                    break;
                case 45:
                case 48:
                    weatherDescription = "Fog and depositing rime fog";
                    weatherIcon = faCloud;
                    break;
                case 51:
                    weatherDescription = "Drizzle: Light";
                    weatherIcon = faCloudSunRain;
                    break;
                case 53:
                    weatherDescription = "Drizzle: moderate";
                    weatherIcon = faCloudRain;
                    break;
                case 55:
                    weatherDescription = "Drizzle: dense intensity";
                    weatherIcon = faCloudRain;
                    break;
                case 56:
                    weatherDescription = "Freezing Drizzle: Dense intensity";
                    weatherIcon = faCloudRain;
                    break;
                case 57:
                    weatherDescription = "Freezing Drizzle: Light intensity";
                    weatherIcon = faCloudRain;
                    break;
                case 61:
                    weatherDescription = "Rain: Slight";
                    weatherIcon = faCloudShowersWater;
                    break;
                case 63:
                    weatherDescription = "Rain: moderate";
                    weatherIcon = faCloudShowersHeavy;
                    break;
                case 65:
                    weatherDescription = "Rain: heavy intensity";
                    weatherIcon = faCloudShowersHeavy;
                    break;
                case 66:
                    weatherDescription = "Freezing Rain: Light intensity";
                    weatherIcon = faCloudRain;
                    break;
                case 67:
                    weatherDescription = "Freezing Rain: Heavy intensity";
                    weatherIcon = faCloudShowersHeavy;
                    break;
                case 71:
                    weatherDescription = "Snow fall: Slight intensity";
                    weatherIcon = faSnowflake;
                    break;
                case 73:
                    weatherDescription = "Snow fall: Moderate intensity";
                    weatherIcon = faSnowflake;
                    break;
                case 75:
                    weatherDescription = "Snow fall: Heavy intensity";
                    weatherIcon = faSnowflake;
                    break;
                case 77:
                    weatherDescription = "Snow grains";
                    weatherIcon = faSnowflake;
                    break;
                case 80:
                    weatherDescription = "Rain showers: Slight";
                    weatherIcon = faCloudShowersWater;
                    break;
                case 81:
                    weatherDescription = "Rain showers: Moderate";
                    weatherIcon = faCloudShowersWater;
                    break;
                case 82:
                    weatherDescription = "Rain showers: violent";
                    weatherIcon = faCloudShowersHeavy;
                    break;
                case 85:
                    weatherDescription = "Snow showers: Slight";
                    weatherIcon = faSnowflake;
                    break;
                case 86:
                    weatherDescription = "Snow showers: Heavy";
                    weatherIcon = faSnowflake;
                    break;
                case 95:
                    weatherDescription = "Thunderstorm: Slight or moderate";
                    weatherIcon = faBolt;
                    break;
                case 96:
                case 99:
                    weatherDescription = "Thunderstorm with slight and heavy hail";
                    weatherIcon = faBoltLightning;
                    break;
                default:
                    throw new Error('Invalid weather code');
            }
        }catch (e : any) {
            weatherDescription = e.toString();
            weatherIcon = null;
        }
        return {weatherDescription: weatherDescription, weatherIcon: weatherIcon};
    }
    const getWhatDay = function(date:string) : string{
        const newDay = new Date(date).getDay();
        switch (newDay){
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "NaN";
        }
    }

    const getRegion = function(location:string) : string{
        let region = location;
        const dividerPosition : number = region.search("/");
        if(dividerPosition === -1){
            throw Error("Invalid format");
        }
        region = region.substring((dividerPosition + 1), region.length);
        region = region.replace("_", " ");
        return region;
    }

    const futureWeatherData = props.futureWeatherData;
    const currentIndex = props.currentIndex;
    const weatherType = convertWeatherType(futureWeatherData.daily.weathercode[currentIndex]);

    return (
        <div className={"future-weather-card"}>
            <div className={"future-weather-card-title"}>
                <div style={{width: "50px", height: "50px", borderRadius: "25px", display: "flex",
                    justifyContent: "center", alignContent: "center", backgroundColor: "#505050",
                    flexWrap: "wrap", margin: "5px"
                }}>
                    <FontAwesomeIcon icon={weatherType.weatherIcon!} />
                </div>
                <div>
                    <div>
                        {getWhatDay(futureWeatherData.daily.time[currentIndex])}
                    </div>
                    <div>
                        {getRegion(futureWeatherData.timezone)}
                    </div>
                </div>
                <div style={{flex: 1}}/>
                <div>
                    {futureWeatherData.daily.time[currentIndex]}
                </div>
            </div>
            <hr/>
            <div style={{display: "flex", justifyContent: "center", color: "white"}} className={"future-weather-card-section"}>
                <div>
                    {weatherType.weatherDescription}
                </div>
            </div>
            <hr/>
            <div className={"future-weather-card-section"}>
                    <div className={"future-weather-card-row"}>
                        <div className={"future-weather-card-row-title"}>
                            <div className={"future-weather-card-row-subtitle-en"}>
                                Highest Temperature
                            </div>
                            <div className={"future-weather-card-row-subtitle-ch"}>
                                最高氣溫
                            </div>
                        </div>
                        <div className={"future-weather-card-row-data"}>
                            {futureWeatherData.daily.temperature_2m_max[currentIndex].toString() +
                                futureWeatherData.daily_units.temperature_2m_max}
                        </div>
                    </div>
                    <div className={"future-weather-card-row"}>
                        <div className={"future-weather-card-temperature-row-title"}>
                            <div className={"future-weather-card-row-subtitle-en"}>
                                Lowest Temperature
                            </div>
                            <div className={"future-weather-card-row-subtitle-ch"}>
                                最低氣溫
                            </div>
                        </div>
                        <div className={"future-weather-card-row-data"}>
                            {futureWeatherData.daily.temperature_2m_min[currentIndex].toString() +
                                futureWeatherData.daily_units.temperature_2m_min}
                        </div>
                    </div>
                </div>
            <hr/>
            <div className={"future-weather-card-section"}>
                <div className={"future-weather-card-row"}>
                    <div className={"future-weather-card-row-title"}>
                        <div className={"future-weather-card-row-subtitle-en"}>
                            Probability of Precipitation
                        </div>
                        <div className={"future-weather-card-row-subtitle-ch"}>
                            降雨率
                        </div>
                    </div>
                    <div className={"future-weather-card-row-data"}>
                        {futureWeatherData.daily.precipitation_probability_max[currentIndex].toString() + "%"}
                    </div>
                </div>
            </div>
            <hr/>

        </div>
    )
}