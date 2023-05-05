import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utils } from "./utils";
import { WeatherData } from "./interfaces/weather-data.model";

import { map } from "rxjs";
import { WeatherCardData } from "./interfaces/weather-card.model";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class Service {

    constructor(private http: HttpClient) {

    }
    utils = new Utils();
    data!: WeatherData;
    customDate = '';
    customTime = '';

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(resp => {

                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
                this.getWeatherDataByLatlong({ latitude: resp.coords.latitude.toString(), longitude: resp.coords.longitude.toString() });
            },
                err => {
                    reject(err);
                });
        });

    }
    getWeatherDataByLatlong(coordinates: { latitude: string, longitude: string }) {
        const apiKey = 'e031dcd3ad8b42c64dce6e16089389d6';
        const apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`;
        this.http.get<WeatherData>(apiLink)
            .pipe(map(
                (responseData: any) => {
                    const weatherData = {
                        name: responseData['name'],
                        country: responseData['sys']['country'],
                        cordinates: {
                            lat: responseData['coord']['lat'],
                            long: responseData['coord']['lon']
                        },
                        weather: {
                            description: responseData['weather'][0]['description'],
                            icon: responseData['weather'][0]['icon']
                        },
                        information: {
                            temp: (Number.parseInt(responseData['main']['temp']) / 10).toString(),
                            feels_like: responseData['main']['feels_like'],
                            temp_min: (Number.parseInt(responseData['main']['temp_min']) / 10).toString(),
                            temp_max: (Number.parseInt(responseData['main']['temp_max']) / 10).toString(),
                            pressure: responseData['main']['pressure'],
                            humidity: responseData['main']['humidity'],
                            visibility: responseData['visibility'],
                            wind_speed: responseData['wind']['speed']
                        },
                        time: this.customDate + this.customTime,
                    }
                    return weatherData;


                }
            ))
            .subscribe(
                (data: WeatherData) => {
                    localStorage.removeItem('current-data');
                    localStorage.setItem('current-data', JSON.stringify(data));
                    this.getTimeByLatlong({ latitude: data.cordinates.lat, longitude: data.cordinates.long });
                }
            );

    }
    getWeatherData(cityName: string) {
        let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e031dcd3ad8b42c64dce6e16089389d6&units=metric`;

        const tempFavData: WeatherCardData[] = JSON.parse(localStorage.getItem('favourites')!);
        for (let i = 0; i < tempFavData.length; i++) {
            if (tempFavData[i].cityName.toLowerCase() == cityName.toLowerCase()) {
                localStorage.setItem('current-data', JSON.stringify(tempFavData[i].weatherData));
                return;
            }
        }

        const tempData: WeatherCardData[] = JSON.parse(localStorage.getItem('recentSearch')!);
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].cityName.toLowerCase() == cityName.toLowerCase()) {
                localStorage.setItem('current-data', JSON.stringify(tempData[i].weatherData));
                return;
            }
        }

        this.http.get<WeatherData>(apiLink)
            .pipe(map(
                (responseData: any) => {
                    console.log('Api called');
                    const weatherData = {
                        name: responseData['name'],
                        country: responseData['sys']['country'],
                        cordinates: {
                            lat: responseData['coord']['lat'],
                            long: responseData['coord']['lon']
                        },
                        weather: {
                            description: responseData['weather'][0]['description'],
                            icon: responseData['weather'][0]['icon']
                        },
                        information: {
                            temp: responseData['main']['temp'],
                            feels_like: responseData['main']['feels_like'],
                            temp_min: responseData['main']['temp_min'],
                            temp_max: responseData['main']['temp_max'],
                            pressure: responseData['main']['pressure'],
                            humidity: responseData['main']['humidity'],
                            visibility: responseData['visibility'],
                            wind_speed: responseData['wind']['speed']
                        },
                        time: this.customDate + this.customTime
                    };
                    if (cityName != '' && !this.utils.isAddedToRecentSearch(cityName))
                        this.utils.addToRecentSearch({
                            cityName: responseData['name'],
                            temperature: Number.parseInt(responseData['main']['temp']).toString(),
                            weatherDescription: responseData['weather'][0]['description'],
                            icon: responseData['weather'][0]['icon'],
                            isFavourite: false,
                            weatherData: weatherData
                        });
                    return weatherData;
                }
            ))
            .subscribe(
                (data: WeatherData) => {
                    localStorage.removeItem('current-data');
                    localStorage.setItem('current-data', JSON.stringify(data));
                    this.getTimeByLatlong({ latitude: data.cordinates.lat, longitude: data.cordinates.long });
                }
            );
    }
    getTimeByLatlong(cordinates: { latitude: string, longitude: string }) {

        this.customDate = '';
        this.customTime = '';
        const apiKey = '667e23afdf864d1d9d89e741ed17452b';
        this.http.get(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${cordinates.latitude}&long=${cordinates.longitude}`)
            .pipe(map(
                (responseData: any) => {
                    return {
                        date: responseData['date_time_wti'],
                        time: responseData['time_12']
                    }
                }
            ))
            .subscribe((data) => {
                for (let i = 0; i < 4; i++) {
                    this.customDate = this.customDate + data.date.toString().split(' ')[i] + ' ';
                }
                this.customTime = `${data.time.toString().split(':')[0]}:${data.time.toString().split(':')[1]} ${data.time.toString().split(' ')[1]}`
                localStorage.setItem('current-data', JSON.stringify({ ...JSON.parse(localStorage.getItem('current-data')!), time: this.customDate + this.customTime }));
                const temp = JSON.parse(localStorage.getItem('current-data')!);
            }
            );

    }
}