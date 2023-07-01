import "../Style/TodayWeatherIndicator.css"
import {
    Avatar,
    createTheme,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader, Skeleton, styled, ThemeProvider,
    Typography
} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import WindPowerIcon from '@mui/icons-material/WindPower';
import WeatherData from "../Model/WeatherData";

interface Props {
    style?: any;
    weatherData: WeatherData | null;
    selected: boolean;

    onClick? : any;
}

export default function TodayWeatherIndicator(props : Props){

    const weatherData = props.weatherData;
    const selected = props.selected;
    const positionStyle = props.style ?? {};
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const convertISODataTime = (dataTimeInISO : string) =>{
        const data = new Date(dataTimeInISO);
        return data.getHours() + ":" + data.getMinutes();
    }
    const getCurrentTemperature = () =>{
        if(weatherData != null){
            const currentHour = today.getHours();
            return weatherData.hourly.temperature_2m[currentHour - 1];
        }
    }

    const theme = createTheme({
        components: {
            MuiListItem: {
                styleOverrides:{
                    root:{
                        padding: selected ? "20px 15px 0 10px" : "0 15px"
                    }
                }
            },
            MuiAvatar:{
                styleOverrides:{
                    root:{
                        width: selected ? 35 : 20,
                        height: selected ? 35 : 20
                    }
                }
            },
            MuiSvgIcon:{
                styleOverrides:{
                    root:{
                        fontSize: selected ? 20 : 12,
                        color: "rgba(0,0,0,0.6)"
                    }
                }
            },
            MuiListSubheader:{
                styleOverrides:{
                    root:{
                        fontSize: selected ? 25 : 15,
                        borderRadius: "25px 25px 0",
                        backgroundColor:"#7E7E7E",
                        lineHeight:"normal",
                        color:"white"
                    }
                }
            },
            MuiListItemAvatar:{
                styleOverrides:{
                    root:{
                        minWidth: selected ? "50px" : "25px"
                    }
                }
            },
            MuiListItemText:{
                styleOverrides:{
                    root:{

                    }
                }
            }
        }
    });
    const selectedHeader = {
        fontSize: 20,
        color:"rgba(0,0,0,0.6)",
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    };
    const unselectedHeader = {
        fontSize: 10,
        color:"rgba(0,0,0,0.6)",
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    }
    const selectedListItem = {
        fontSize: 16,
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    }
    const unselectedListItem = {
        fontSize: 8,
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    }
    const selectedSubListItem = {
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.6)",
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    }
    const unselectedSubListItem = {
        fontSize: 8,
        color: "rgba(0, 0, 0, 0.6)",
        transition: "width 2s, height 2s, background-color 2s, rotate 2s",
    }

    const selectableListItemStyle = selected ? selectedListItem : unselectedListItem;
    const selectableSubListItemStyle = selected ? selectedSubListItem : unselectedSubListItem;
    const selectableHeaderStyle = selected ? selectedHeader : unselectedHeader;


    if(weatherData != null){
        return(
            <ThemeProvider theme={theme}>
                <div className={"today-weather-card"}>
                    <div onClick={props.onClick} className={selected ? "today-weather-indicator-selected" : "today-weather-indicator-unselected"}>
                        <div style={positionStyle} className={"today-weather-indicator-background"}>
                            <div className={"today-weather-indicator-text-unselected"}>
                                <List
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        padding: '0px'
                                    }}
                                    subheader={
                                        <div style={{padding: "20px 20px 10px 10px"}}>
                                            {/*Header*/}
                                            <ListSubheader component="div" children={"Current Weather"} />
                                            <ListSubheader
                                                sx={selectableHeaderStyle}
                                                component="div" children={"當前天氣"} />
                                        </div>
                                    }
                                >
                                    {/*Time Zone*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <MapIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{}} primary={
                                            <Typography style={selectableListItemStyle}>Location</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>Time Zone</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{weatherData.timezone}</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>{weatherData.timezone_abbreviation}</Typography>
                                        } />
                                    </ListItem>
                                    {/*Current Temperature*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <MapIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Temperature</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>氣溫</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{getCurrentTemperature()}°C</Typography>
                                        }/>
                                    </ListItem>
                                    {/*Maximum and Minimum Temperature*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ThermostatIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Temperature(Max)</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>最高氣溫</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{weatherData.daily.temperature_2m_max}{weatherData.daily_units.temperature_2m_max}</Typography>
                                        }/>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ThermostatIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Temperature(Min)</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>最低氣溫</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{weatherData.daily.temperature_2m_min}{weatherData.daily_units.temperature_2m_min}</Typography>
                                        }/>
                                    </ListItem>
                                    {/*Sunrise and Sunset Time*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <WbTwilightIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Sunrise Time</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>日出時間</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{convertISODataTime(weatherData.daily.sunrise[0])}</Typography>
                                        }/>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DarkModeIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Sunset Time</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>日落時間</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{convertISODataTime(weatherData.daily.sunset[0])}</Typography>
                                        }/>
                                    </ListItem>
                                    {/*Precipitation Probability*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <BeachAccessIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Precipitation Probability</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>降雨機率</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{weatherData.daily.precipitation_probability_max}%</Typography>
                                        }/>
                                    </ListItem>
                                    {/*Max Wind Speed*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <WindPowerIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>Wind Speed(Max)</Typography>
                                        } secondary={
                                            <Typography style={selectableSubListItemStyle}>最大風速</Typography>
                                        } />
                                        <ListItemText primary={
                                            <Typography style={selectableListItemStyle}>{weatherData.daily.windspeed_10m_max}km/h</Typography>
                                        }/>
                                    </ListItem>
                                </List>
                                <div className={"today-weather-indicator-footer"}>
                                    {/*Footer*/}
                                    <ListItem sx={{}}>
                                        <ListItemText sx={{justifyContent: "start", display: "flex"}} primary={
                                            <Typography style={selectableListItemStyle}>Latest update: {currentDate}</Typography>
                                        }/>
                                    </ListItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }else{
        return(
            <ThemeProvider theme={theme}>
                <div className={"today-weather-card"}>
                    <div onClick={props.onClick} className={selected ? "today-weather-indicator-selected" : "today-weather-indicator-unselected"}>
                        <div style={positionStyle} className={"today-weather-indicator-background"}>
                            <div className={"today-weather-indicator-text-unselected"}>
                                <List
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        padding: '0px'
                                    }}
                                    subheader={
                                        <div style={{padding: "20px 20px 10px 10px"}}>
                                            {/*Header*/}
                                            <Skeleton sx={selectableHeaderStyle} variant={"text"} />
                                            <Skeleton sx={selectableHeaderStyle} variant={"text"} />
                                        </div>
                                    }
                                >
                                    {/*Time Zone*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{}} primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } />
                                    </ListItem>
                                    {/*Current Temperature*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        }/>
                                    </ListItem>
                                    {/*Maximum and Minimum Temperature*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle}variant={"text"} />
                                        }/>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        }/>
                                    </ListItem>
                                    {/*Sunrise and Sunset Time*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        }/>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"}/>
                                        }/>
                                    </ListItem>
                                    {/*Precipitation Probability*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        }/>
                                    </ListItem>
                                    {/*Max Wind Speed*/}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Skeleton sx={selectableListItemStyle} variant="circular"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        } secondary={
                                            <Skeleton sx={selectableSubListItemStyle} variant={"text"} />
                                        } />
                                        <ListItemText primary={
                                            <Skeleton sx={selectableListItemStyle} variant={"text"} />
                                        }/>
                                    </ListItem>
                                </List>
                                <div className={"today-weather-indicator-footer"}>
                                    {/*Footer*/}
                                    <ListItem sx={{}}>
                                        <ListItemText sx={{justifyContent: "start", display: "flex"}} primary={
                                            <Skeleton sx={selectableListItemStyle } variant={"text"} />
                                        }/>
                                    </ListItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}