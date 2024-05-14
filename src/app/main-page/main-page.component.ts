import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LocationService, LocationUpdate } from 'app/location.service';
import { WeatherService } from 'app/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  private weatherService = inject(WeatherService);
  private locationService = inject(LocationService);

  ngOnInit(): void {
    this.subscribeToLocations();
  }

  subscribeToLocations(): void {
    this.subscription.add(
      this.locationService.getLocationUpdate().subscribe((location: LocationUpdate) => {
        location.toRemove ?
          this.weatherService.removeCurrentConditions(location.zipcode) :
          this.weatherService.addCurrentConditions(location.zipcode);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
