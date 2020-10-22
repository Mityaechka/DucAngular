import {
  IReceiptField,
  ReceiptFieldFactory,
} from './../../models/receipt-field.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-receipt-preview',
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.css'],
})
export class ReceiptPreviewComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  get fields(): IReceiptField[] {
    return ReceiptFieldFactory.getFields(this.rawData);
  }
  rawData: { type: string; data: any }[] = [];
  @Input() set data(value: { type: string; data: any }[]) {
    if (value && Array.isArray(value)) {
      this.rawData = value;
      this.redrawCanvas();
    }
  }
  @Input() showPrint = true;

  constructor() {}

  ngAfterViewInit(): void {
    this.redrawCanvas();
    this.redrawCanvas();
  }
  redrawCanvas() {
    if (!this.canvas) {
      return;
    }
    let yPos = 0;
    const nativeElement = this.canvas.nativeElement;
    const context = nativeElement.getContext('2d');
    context.clearRect(0, 0, nativeElement.width, nativeElement.height);
    this.fields.forEach((x) => {
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
  print() {
    const dataUrl = this.canvas.nativeElement
      .toDataURL('image/png')
      .replace('data:image/png;base64,', '');
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
