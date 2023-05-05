import { Component, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Service } from './service';
import { Utils } from './utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  data = JSON.parse(localStorage.getItem('current-data')!);
  constructor(private service: Service) {
    console.log(localStorage.getItem('current-data'));
    if (localStorage.getItem('current-data') == null) {
      service.getPosition();
    }
  }
  ngDoCheck(): void {
    if (localStorage.getItem('current-data') != null) {
      this.data = JSON.parse(localStorage.getItem('current-data')!);
    }
  }
}
