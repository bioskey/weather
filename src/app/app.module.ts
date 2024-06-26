import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { LocationService } from "./location.service";
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { WeatherService } from "./weather.service";
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TabItemComponent } from './tab-view/tab-item/tab-item.component';
import { StorageService } from './storage.service';
import { RecordingTimeEntryComponent } from './recording-time-entry/recording-time-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TabViewComponent,
    TabItemComponent,
    RecordingTimeEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocationService, WeatherService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
