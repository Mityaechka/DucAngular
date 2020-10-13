import { IReceiptField } from './../../models/receipt-field.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-receipt-preview',
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.css'],
})
export class ReceiptPreviewComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @Input() data: IReceiptField[];
  @Input() onDataCahnge: Function;
  constructor() {}

  ngOnInit(): void {}
  redrawCanvas() {
    let yPos = 0;
    const nativeElement = this.canvas.nativeElement;
    const context = nativeElement.getContext('2d');
    context.clearRect(0, 0, nativeElement.width, nativeElement.height);
    this.onDataCahnge().forEach((x) => {
      if (x) {
        yPos = x.drawField(nativeElement, yPos);
      }
    });
    this.resizeCanvas(nativeElement, yPos);
  }
  resizeCanvas(canvas, height) {
    if (height === 0) {
      return;
    }
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = height;
    tempContext.fillStyle = 'white';
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.drawImage(canvas, 0, 0);

    canvas.height = height;
    canvas.getContext('2d').drawImage(tempCanvas, 0, 0);
  }
  sendMessage() {
    const dataUrl = this.canvas.nativeElement.toDataURL('image/png').replace('data:image/png;base64,', '');
    const event = new CustomEvent('printCanvas', {
      detail: {
        commands: [
          {
            print_canvas: dataUrl,
          },
        ],
      },
    });
    document.dispatchEvent(event);
  }
}
