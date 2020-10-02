import { Injectable, EventEmitter } from '@angular/core';
declare const onScan: any;
@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  private scanEvent = new EventEmitter<string>();
  constructor() {
    onScan.attachTo(document);
    document.addEventListener('scan', (scancode: any) => {
      this.scanEvent.emit(scancode.detail.scanCode);
    });
  }
  subscribeScanEvent(event: (barcode: string) => void) {
    return this.scanEvent.subscribe(event);
  }
}
