import { WeatherData } from "./weather-data.model";

export interface WeatherCardData {
    cityName: string;
    temperature: string;
    weatherDescription: string;
    icon?: string;
    isFavourite: boolean;
    weatherData?: WeatherData
} 