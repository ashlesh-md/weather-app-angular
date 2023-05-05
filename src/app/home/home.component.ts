import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../interfaces/weather-data.model';
import { Router } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  currentData: WeatherData = JSON.parse(localStorage.getItem('current-data')!);

  weatherInformation: { title: string; value: string; imageLink: string; }[] = [
    {
      title: 'Min-Max',
      value: `${Number.parseInt(this.currentData.information.temp_min)}°-${Number.parseInt(this.currentData.information.temp_min)}°`,
      imageLink: 'assets/weather-icons/icon_temperature_info.png'
    },
    {
      title: 'Humidity',
      value: this.currentData.information.humidity,
      imageLink: 'assets/weather-icons/icon_humidity_info.png'
    }
    ,
    {
      title: 'Pressure',
      value: this.currentData.information.pressure,
      imageLink: 'assets/weather-icons/icon_precipitation_info.png'
    },
    {
      title: 'Visibility',
      value: this.currentData.information.visibility,
      imageLink: 'assets/weather-icons/icon_visibility_info.png'
    },
    {
      title: 'Wind Speed',
      value: this.currentData.information.wind_speed,
      imageLink: 'assets/weather-icons/icon_wind_info.png'
    },
    {
      title: 'Feels Like',
      value: this.currentData.information.feels_like,
      imageLink: 'assets/weather-icons/icon_temperature_info.png'
    }
  ];
}
