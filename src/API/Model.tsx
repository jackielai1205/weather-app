interface WeatherAllData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        temperature_2m: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
    };
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        sunrise: string;
        sunset: string;
        precipitation_probability_max: string;
        windspeed_10m_max: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
        precipitation_probability_max: number[];
        windspeed_10m_max: number[];
    };
}

interface FutureWeatherData {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    daily_units: {
        time: string,
        weathercode: string,
        temperature_2m_max: string,
        temperature_2m_min: string,
        precipitation_probability_max: string
    },
    daily: {
        time: string[],
        weathercode: number[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        precipitation_probability_max: number[]
    }
}

export type {WeatherAllData, FutureWeatherData};