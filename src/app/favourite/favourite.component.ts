import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Utils } from '../utils';
import { WeatherCardData } from '../interfaces/weather-card.model';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit, DoCheck {
  weatherData = [];
  utils = new Utils();
  constructor() {
    if (localStorage.getItem('favourites') == null)
      localStorage.setItem('favourites',
        JSON.stringify(this.weatherData)
      );
  }
  ngDoCheck(): void {
    if (localStorage.getItem('favourites') != null) {
      this.weatherData = JSON.parse(localStorage.getItem('favourites')!);
      console.log('Local storage data');
    }
  }
  ngOnInit(): void {
    this.weatherData = JSON.parse(localStorage.getItem('favourites')!);
    console.log('Local storage data');
  }

  recentSearch: WeatherCardData[] = [];
  favourites: WeatherCardData[] = [];
  temp: WeatherCardData[] = [];


  clearFavourites() {
    if (confirm('Do you want to clear all the favourites')) {
      console.log();
      this.favourites = JSON.parse(localStorage.getItem('favourites')!);
      this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);

      for (let i = 0; i < this.recentSearch.length; i++) {
        if (this.utils.isAddedToFavourite(this.recentSearch[i].cityName)) {
          this.temp.push(
            {
              cityName: this.recentSearch[i].cityName,
              temperature: this.recentSearch[i].temperature,
              weatherDescription: this.recentSearch[i].weatherDescription,
              icon: this.recentSearch[i].icon,
              isFavourite: false,
              weatherData: this.recentSearch[i].weatherData
            }
          );
        }
        else {
          this.temp.push(
            this.recentSearch[i]
          );
        }
      }
      localStorage.removeItem('favourites');
      localStorage.setItem('favourites', JSON.stringify([]));
      localStorage.setItem('recentSearch', JSON.stringify(this.temp));
    }
    else {
      return;
    }

  }


}
