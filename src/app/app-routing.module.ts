import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: FavouriteComponent,
    path: 'favourites'
  },
  {
    component: RecentSearchComponent,
    path: 'recent-searches'
  }
  , {

    component: HomeComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
