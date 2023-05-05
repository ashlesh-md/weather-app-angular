import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherCardData } from '../interfaces/weather-card.model';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent implements DoCheck, OnInit {
  weatherData = [];
  constructor() {
    if (localStorage.getItem('recentSearch') == null) {
      localStorage.setItem('recentSearch',
        JSON.stringify(this.weatherData)
      );
    }

  }
  ngOnInit(): void {
    this.weatherData = JSON.parse(localStorage.getItem('recentSearch')!);
    console.log('Local storage data');
  }
  ngDoCheck(): void {
    if (localStorage.getItem('recentSearch') != null) {
      this.weatherData = JSON.parse(localStorage.getItem('recentSearch')!);
      console.log('Do check');
    }
  }

  recentSearch: WeatherCardData[] = [];
  clearRecentSearch() {
    if (confirm('Do you want to clear all the recent searches')) {
      console.log();
      this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);
      localStorage.removeItem('recentSearch');
      localStorage.setItem('recentSearch', JSON.stringify([]));
    }
    else {
      return;
    }

  }
}
