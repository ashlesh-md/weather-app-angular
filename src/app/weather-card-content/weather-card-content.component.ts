import { Component, Input } from '@angular/core';
import { Utils } from '../utils';
import { WeatherCardData } from '../interfaces/weather-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card-content',
  templateUrl: './weather-card-content.component.html',
  styleUrls: ['./weather-card-content.component.css']
})
export class WeatherCardContentComponent {
  @Input()
  weatherData!: WeatherCardData;
  utils = new Utils();
  constructor(private route: Router) {

  }
  removeFromFavourite =
    (weatherData: WeatherCardData) =>
      this.utils.removeFromFavourite(weatherData);
  addToFavourite =
    (weatherData: WeatherCardData) =>
      this.utils.addToFavourite(weatherData);

  changeCurrentData = () => {
    localStorage.setItem('current-data', JSON.stringify(
      this.weatherData.weatherData
    ));
    this.route.navigateByUrl('');
  }
}
