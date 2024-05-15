import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { StorageService } from './storage.service';
import { LOCATIONS } from './location.service';

@Injectable()
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private http: HttpClient, private storageService: StorageService) { }

  addCurrentConditions(zipcode: string): void {
    // Try to get data from localstorage
    let data = this.storageService.getItem(zipcode + '-data');
    if (data) {
      this.currentConditions.update(conditions => {
        return this.searchZipcode(zipcode, conditions) ? conditions : [...conditions, { zip: zipcode, data }]
      });
      return;
    }

    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
      .subscribe(
        (data) => {
          this.storageService.setItem(zipcode + '-data', data);
          this.currentConditions.update(conditions => {
            return this.searchZipcode(zipcode, conditions) ? conditions : [...conditions, { zip: zipcode, data }];
          })
        },
        (error) => {
          this.handleError(error, zipcode);
        }
      );
  }

  // Remove zipcode from localstorage when 404 not found
  handleError(err: HttpErrorResponse, zipcode: string) {
    if (err.error.cod == 404) {
      let locations = this.storageService.getItem(LOCATIONS);
      let index = locations ? locations.indexOf(zipcode) : -1;

      if (index !== -1) {
        locations.splice(index, 1);
        this.storageService.setItem(LOCATIONS, locations);
      }
    }
  }

  // Return true if key (zipcode) is found in arry of conditions zip
  searchZipcode(zipcode: string, conditions: ConditionsAndZip[]): boolean {
    return conditions.map(condition => condition.zip).indexOf(zipcode) !== -1;
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Try to get data from localstorage
    let data = this.storageService.getItem(zipcode + '-forecast');

    // Avoid http call when data is loaded from localstorage
    return data ? of(data) : this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }
}
