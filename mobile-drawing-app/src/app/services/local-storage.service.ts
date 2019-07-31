import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private isLocalStorageEnabled: boolean;
  private isLocalStoragePresent: boolean;

  constructor() {
    this.checkSupport();
  }

  isAvailable(): boolean {
    return this.isLocalStoragePresent && this.isLocalStorageEnabled;
  }

  get(key: string): any {
    return this.deserialize(window.localStorage.getItem(key));
  }

  set(key: string, value: any): any {
    if (value === undefined) {
      return window.localStorage.removeItem(key);
    }
    window.localStorage.setItem(key, this.serialize(value));
    return value;
  }

  flush(keyToDelete: Array<string>): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keyToDelete.length; ++i) {
      window.localStorage.removeItem(keyToDelete[i]);
    }
  }

  clear(): void {
    window.localStorage.clear();
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }

  private serialize = (value: any): string => {
    return JSON.stringify(value);
  }

  private checkSupport() {
    try {
      this.isLocalStoragePresent = window.localStorage != null;
      this.isLocalStorageEnabled = true;
    } catch (e) {
      this.isLocalStoragePresent = true;
      this.isLocalStorageEnabled = false;
    }
  }

  private deserialize = (value: string): any => {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.warn(`Yo Bro, your value is NOT a valid JSON ${value}`);
      return null;
    }
  }
}
