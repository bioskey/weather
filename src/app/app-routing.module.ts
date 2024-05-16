import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForecastsListComponent} from "./forecasts-list/forecasts-list.component";
import {MainPageComponent} from "./main-page/main-page.component";

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode', component: ForecastsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
