import { Component, Input, OnInit } from '@angular/core';

import { MenuItems } from '../constants';
import { WeatherData } from '../interfaces/weather-data.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  time: string = '';
  ngOnInit(): void {
    if (localStorage.getItem('current-data') != null)
      this.time = JSON.parse(localStorage.getItem('current-data')!).time;

  }
  @Input()
  selectedMenu!: MenuItems;
}
