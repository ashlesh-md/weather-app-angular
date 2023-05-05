import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent {
  @Input()
  weatherInformation!: {
    title: string;
    value: string;
    imageLink: string;
  }[];
}
