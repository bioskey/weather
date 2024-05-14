import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-tab-item',
    templateUrl: './tab-item.component.html',
})
export class TabItemComponent {
    @Input() tabName: string;
    @Input() zipcode: string;
    @Input() contentRef: TemplateRef<any>;
}
