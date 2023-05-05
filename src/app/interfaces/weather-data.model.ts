export interface WeatherData {
    name: string,
    country: string
    cordinates: { lat: string, long: string },
    weather: { description: string, icon: string },
    information: {
        temp: string,
        feels_like: string,
        temp_min: string,
        temp_max: string,
        pressure: string,
        humidity: string,
        visibility: string,
        wind_speed: string
    },
    time: string
}
