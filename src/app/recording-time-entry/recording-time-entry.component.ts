import { Component, inject } from '@angular/core';
import { StorageService } from 'app/storage.service';

@Component({
    selector: 'app-recording-time-entry',
    templateUrl: './recording-time-entry.component.html',
    styles: ['span { color: green }']
})
export class RecordingTimeEntryComponent {

    private service = inject(StorageService);
    isSaved = false;
    unit: string = 'hour';

    setTime(time: number) {
        if (time < 1) {
            return;
        }

        // Convert to ms
        switch (this.unit) {
            case 'sec': time = time * 1000; break;
            case 'min': time = time * 60 * 1000; break;
            case 'hour': time = time * 60 * 60 * 1000;
        }

        this.service.setRecordingTime(time);
        this.isSaved = true;

        setTimeout(() => {
            this.isSaved = false;
        }, 2000);
    }

}