import { Injectable } from '@angular/core';
import { AbstractStorageAdapter } from "./storage-adapter.service";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends AbstractStorageAdapter {

  /**
   * Custom localStorage.getItem
   */
  getItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    if (!data || data === 'undefined' || data === 'null') {
      return null;
    }
    return data as unknown as T;
  }


  /**
   * Custom localStorage.setItem
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }


  /**
   * Custom localStorage.removeItem
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
