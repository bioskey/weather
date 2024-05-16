import { Injectable } from '@angular/core';

export const RECORDINGTIME: string = "recording-time";

@Injectable()
export class StorageService {

    // Time in ms
    private _recordingTime: number = 3600000; // 1 hour

    constructor() {
        let record = localStorage.getItem(RECORDINGTIME);
        if (record)
            this._recordingTime = JSON.parse(record);
    }

    setRecordingTime(time: number) {
        this._recordingTime = time;
        localStorage.setItem(RECORDINGTIME, JSON.stringify(this._recordingTime));
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify({ value: value, expireTime: Date.now() + this._recordingTime }));
    }

    getItem(key: string): string | null {
        let result = JSON.parse(localStorage.getItem(key));
        if (result) {
            // Remove item when recording time is expired
            if (result.expireTime <= Date.now()) {
                localStorage.removeItem(key);
                result.value = null;
            }
        }
        return result && result.value ? JSON.stringify(result.value) : null;
    }
}
