import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

export const LOCATIONS: string = "locations";

// Interface to handle location change
export interface LocationUpdate {
  zipcode: string;
  toRemove: boolean;
}

@Injectable()
export class LocationService {

  private _locations: string[] = [];
  private storageService = inject(StorageService);
  public locationChange = new Subject<LocationUpdate>();

  getLocationUpdate(): Observable<LocationUpdate> {
    return this.locationChange.asObservable();
  }

  getLocationsFromStorage(): void {
    this._locations = this.storageService.getItem(LOCATIONS) ?? this._locations;

    for (let loc of this._locations)
      this.locationChange.next({ zipcode: loc, toRemove: false });
  }

  addLocation(zipcode: string): void {
    let index = this._locations.indexOf(zipcode);
    if (index !== -1 || zipcode.length < 1) {
      return;
    }
    this._locations.push(zipcode);
    this.storageService.setItem(LOCATIONS, this._locations);
    this.locationChange.next({ zipcode: zipcode, toRemove: false });
  }

  removeLocation(zipcode: string): void {
    let index = this._locations.indexOf(zipcode);
    if (index !== -1) {
      this._locations.splice(index, 1);
      this.storageService.setItem(LOCATIONS, this._locations);
      this.locationChange.next({ zipcode: zipcode, toRemove: true });
    }
  }
}
