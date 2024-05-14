import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    // Time in ms
    readonly recordingTime = 3600000; // 1 hour

    setItem(key: string, value: any): void {
        // Set expire time with value
        localStorage.setItem(key, JSON.stringify({ value: value, expireTime: Date.now() + this.recordingTime }));
    }

    getItem(key: string): any {
        let result = JSON.parse(localStorage.getItem(key));
        if (result) {
            // Remove item when recording time is expired
            if (result.expireTime <= Date.now()) {
                localStorage.removeItem(key);
                result.value = null;
            }
        }
        return result?.value;
    }
}
