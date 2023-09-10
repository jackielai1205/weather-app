import {WeatherAllData} from "../API/Model";
import TodayWeatherIndicator from "./TodayWeatherIndicator";
import React, {useState} from "react";
import {IconButton} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

interface Props {
    weathersData: {
        [key: string]: WeatherAllData
    }
}
export default function TodayWeatherList(props: Props){

    const weathers = props.weathersData;
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const [todayWeatherListPosition, setTodayWeatherListPosition] = useState<number>(50);

    const moveLeft = () => {
        if(selectedIndex <= 0){
            return;
        }
        setSelectedIndex(selectedIndex - 1);
        setTodayWeatherListPosition(todayWeatherListPosition + 50);
    }

    const moveRight = () => {
        if(selectedIndex >= Object.keys(weathers).length - 1){
            return;
        }
        setSelectedIndex(selectedIndex + 1);
        setTodayWeatherListPosition(todayWeatherListPosition - 50);
    }

    if(Object.keys(weathers).length <= 0){
        return(
            <div className={"today-weather-list"}>
                <IconButton disabled sx={{backgroundColor: "grey", '&:hover':{backgroundColor: "grey"}}}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <TodayWeatherIndicator weatherData={null} selected={false}/>
                <TodayWeatherIndicator weatherData={null} selected={true}/>
                <TodayWeatherIndicator weatherData={null} selected={false}/>
                <IconButton disabled sx={{backgroundColor: "grey", '&:hover': {backgroundColor: "grey"}}}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        )
    }else{
        return(
            <div className={"today-weather-list"}>
                <IconButton onClick={moveLeft} sx={{backgroundColor: "grey", position: "absolute",left: "5px", zIndex: "5" ,'&:hover':{backgroundColor: "grey"}}}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <div style={{marginLeft: todayWeatherListPosition + "vw"}} className={"today-weather-list-container"}>
                    {Object.keys(weathers).map((key, index)=>{
                        return <TodayWeatherIndicator key={key} weatherData={weathers[key]} selected={selectedIndex === index}/>
                    })}
                </div>
                <IconButton onClick={moveRight} sx={{backgroundColor: "grey", position: "absolute", right: "5px", zIndex: "5", '&:hover': {backgroundColor: "grey"}}}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        )
    }
}