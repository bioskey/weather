import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, QueryList, inject } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { LocationService } from 'app/location.service';

@Component({
    selector: 'app-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent implements AfterContentChecked {

    private locationService = inject(LocationService);
    @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;
    activeComponent: TabItemComponent;

    ngAfterContentChecked(): void {
        if (!this.activeComponent)
            this.activeComponent = this.tabs.first;
    }

    activateTab(tab: TabItemComponent): void {
        this.activeComponent = tab;
    }

    removeTab(zipcode: string): void {
        this.locationService.removeLocation(zipcode);
        this.activeComponent = this.tabs.filter(tab => tab.zipcode !== zipcode)[0];
    }
}