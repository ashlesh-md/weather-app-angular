import { Component, Input } from '@angular/core';
import { Utils } from '../utils';
import { Router } from '@angular/router';
import { MenuItems } from '../constants';
import { Service } from '../service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route: Router, private service: Service) {
  }
  @Input()
  selectedMenu!: MenuItems;
  searchBoxContent = '';
  utils = new Utils();
  mobileSearch = false;
  // selectedMenu = MenuItems.Home
  isDrawerOpen = false

  getWeatherData = () => {
    this.service.getWeatherData(this.searchBoxContent);
    console.log(this.searchBoxContent);
    this.searchBoxContent = '';
    this.route.navigateByUrl('');
    this.mobileSearch = false;
  }



}
