import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherCardData } from 'src/app/interfaces/weather-card.model';
import { WeatherData } from 'src/app/interfaces/weather-data.model';
import { Service } from 'src/app/service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})

export class HomeContentComponent implements OnInit, DoCheck {
  time: string = '';
  isCelcius = true;
  utils = new Utils();
  currentData: WeatherData = JSON.parse(localStorage.getItem('current-data')!);
  ;
  constructor(private service: Service) {
    this.currentData = JSON.parse(localStorage.getItem('current-data')!);
  }

  ngDoCheck(): void {
    if (localStorage.getItem('current-data') != null)
      this.currentData = JSON.parse(localStorage.getItem('current-data')!);
    if (localStorage.getItem('current-data') != null)
      this.time = this.currentData.time;

  }

  ngOnInit(): void {
    if (localStorage.getItem('current-data') != null)
      this.currentData = JSON.parse(localStorage.getItem('current-data')!);
    if (localStorage.getItem('current-data') != null)
      this.time = this.currentData.time;
  }

  removeFromFavourite =
    () =>
      this.utils.removeFromFavourite({
        cityName: this.currentData.name,
        temperature: this.currentData.information.temp,
        weatherDescription: this.currentData.weather.description,
        icon: this.currentData.weather.icon,
        weatherData: this.currentData,
        isFavourite: false
      });
  addToFavourite =
    () =>
      this.utils.addToFavourite({
        cityName: this.currentData.name,
        temperature: this.currentData.information.temp,
        weatherDescription: this.currentData.weather.description,
        icon: this.currentData.weather.icon,
        weatherData: this.currentData,
        isFavourite: true
      });

  isAddedToFavourite = (cityName: string) => this.utils.isAddedToFavourite(cityName);

  temperatureConverter(tempData: { isCelsius: boolean, temperature: string }) {
    if (tempData.isCelsius) {
      return Number.parseInt(this.currentData.information.temp).toString();
    }
    else {
      return Number.parseInt(
        (
          (Number.parseInt(this.currentData.information.temp) * 9 / 5)
          + 32
        )
          .toString()
      );
    }
  }
}
