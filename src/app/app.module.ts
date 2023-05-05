import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { WeatherCardContentComponent } from './weather-card-content/weather-card-content.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    WeatherCardContentComponent,
    FavouriteComponent,
    RecentSearchComponent,
    HomeContentComponent,
    HomeFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
