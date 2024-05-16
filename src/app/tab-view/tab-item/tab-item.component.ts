import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-tab-item',
    template: ''
})
export class TabItemComponent {
    @Input() tabName: string;
    @Input() zipcode: string;
    @Input() contentRef: TemplateRef<Element>;
}
