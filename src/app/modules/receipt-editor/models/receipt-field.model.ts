import { AfterContentInit, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';

declare function CanvasTextWrapper(
  canvas,
  text: string,
  textPos: { x: number; y: number },
  optionns: any
): { x: number; y: number };

export class ReceiptComponent
  implements OnInit, ControlValueAccessor, AfterContentInit {
  form: FormGroup;

  ngAfterContentInit(): void {
    // debugger
    this.onChange(this.form.getRawValue());
  }

  onChange = (data: any) => {};

  writeValue(obj: any): void {
    if (obj) {
      this.form.patchValue(obj);
      this.onChange(this.form.getRawValue());
    }
  }
  registerOnChange(fn: (rating: number[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  setDisabledState(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.onChange(this.form.getRawValue());
    });
  }
}

export interface IReceiptField {
  getData(): any;
  drawField(canvas: HTMLCanvasElement, startPos: number): number;
}
export class SimpleTextAreaFiled implements IReceiptField {
  constructor(
    public data: {
      text: string;
      style: string;
      fontSize: number;
      align: string;
    }
  ) {}
  getData() {
    return this.data;
  }

  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    return CanvasTextWrapper(
      canvas,
      this.data.text,
      { x: 0, y: startPos },
      {
        font: `${this.data.style} ${this.data.fontSize}px Times New Roman  `,
        textAlign: this.data.align,
      }
    ).y;
  }
}

export class DoubleTextAreaFiled implements IReceiptField {
  constructor(
    public data: {
      firstText: string;
      secondText: string;
      style: string;
      fontSize: number;
      align: string;
    }
  ) {}
  getData() {
    return this.data;
  }
  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    const firstPos = CanvasTextWrapper(
      canvas,
      this.data.firstText,
      { x: 0, y: startPos },
      {
        font: `${this.data.style} ${this.data.fontSize}px Times New Roman  `,
        textAlign: 'left',
        maxWidth: canvas.width / 2,
      }
    );
    const secondPos = CanvasTextWrapper(
      canvas,
      this.data.secondText,
      { x: canvas.width / 2, y: startPos },
      {
        font: `${this.data.style} ${this.data.fontSize}px Times New Roman  `,
        textAlign: 'right',
        maxWidth: canvas.width / 2,
      }
    );
    return firstPos.y > secondPos.y ? firstPos.y : secondPos.y;
  }
}

export class ComplexTextAreaFiled implements IReceiptField {
  options: any;
  constructor(
    public data: {
      texts: {
        width: number;
        text: string;
        style: string;
        fontSize: number;
        align: string;
      }[];
    }
  ) {}
  getData() {
    return this.data;
  }
  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    let textWidth = 0;
    this.data.texts.forEach((x) => {
      textWidth += x.width;
    });

    let fitWidth = 0;
    let newYPos = startPos;
    const textColumnWidth = canvasWidth / textWidth;
    for (const text of this.data.texts) {
      const width = textColumnWidth * text.width;

      const newPos = CanvasTextWrapper(
        canvas,
        text.text,
        { x: fitWidth, y: startPos },
        {
          maxWidth: width,
          font: `${text.style} ${text.fontSize}px Times New Roman `,
          textAlign: text.align,
        }
      );

      fitWidth += width;
      if (newPos.y >= newYPos) {
        newYPos = newPos.y;
      }
    }
    return newYPos;
  }
}

export class IndentAreaFiled implements IReceiptField {
  constructor(public data: { indent: number }) {}
  getData() {
    return this.data;
  }
  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    return startPos + this.data.indent;
  }
}

export class LineAreaFiled implements IReceiptField {
  constructor(public data: { symbol: string; fontSize: number }) {}
  getData() {
    return this.data;
  }
  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    const ctx = canvas.getContext('2d');
    if (!this.data.symbol) {
      this.data.symbol = '-';
    }
    const symbolWidth = getTextSize(
      'Times New Roman',
      this.data.symbol,
      this.data.fontSize,
      'normal'
    );
    startPos += symbolWidth[1];
    const step = symbolWidth[0] * 2;
    ctx.font = `${this.data.fontSize}px Times New Roman`;
    ctx.textAlign = 'center';
    for (let i = 0; i < canvas.width; i += step) {
      ctx.fillText(this.data.symbol, i, startPos);
    }
    return startPos;
  }
}
export class TableAreaFiled implements IReceiptField {
  constructor(
    public data: {
      fontSize: number;
      headers: { width: number; name: string }[];
      showBorder: boolean;
      data: { width: number; align: string; value: string }[][][];
    }
  ) {}
  getData() {
    return this.data;
  }
  drawField(canvas: HTMLCanvasElement, startPos: number): number {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    const canvasWidth = canvas.width;
    let headerWidth = 0;
    this.data.headers.forEach((x) => {
      headerWidth += x.width;
    });

    const headerBorderPositions = [];
    let fitWidth = 0;
    let newYPos = startPos;
    const headerColumnWidth = canvasWidth / headerWidth;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.data.headers.length; i++) {
      const header = this.data.headers[i];
      const width = headerColumnWidth * header.width;

      const newPos = CanvasTextWrapper(
        canvas,
        header.name,
        { x: fitWidth, y: startPos },
        {
          maxWidth: width,
          font: `${this.data.fontSize}px Times New Roman  `,
        }
      );

      fitWidth += width;
      headerBorderPositions.push(newPos.x);
      if (newPos.y >= newYPos) {
        newYPos = newPos.y;
      }
    }

    if (this.data.showBorder) {
      ctx.beginPath();
      ctx.moveTo(0, newYPos);
      ctx.lineTo(canvasWidth, newYPos);
      ctx.stroke();
      for (let i = 1; i < headerBorderPositions.length; i++) {
        const border = headerBorderPositions[i];
        ctx.beginPath();
        ctx.moveTo(border, startPos);
        ctx.lineTo(border, newYPos);
        ctx.stroke();
      }
    }
    startPos = newYPos;
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < this.data.data.length; j++) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.data.data[j].length; i++) {
        const row = this.data.data[j][i];
        let rowsWidth = 0;
        const rowsBorderPosition = [];
        // tslint:disable-next-line: no-shadowed-variable
        let fitWidth = 0;
        row.forEach((x) => {
          rowsWidth += x.width;
        });
        const rowWidth = canvasWidth / rowsWidth;

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < row.length; j++) {
          const column = row[j];
          const width = rowWidth * column.width;
          const newPos = CanvasTextWrapper(
            canvas,
            column.value,
            { x: fitWidth, y: startPos },
            {
              maxWidth: width,
              font: `${this.data.fontSize}px Times New Roman  `,
              textAlign: column.align,
            }
          );

          fitWidth += width;
          rowsBorderPosition.push(newPos.x);
          if (newPos.y >= newYPos) {
            newYPos = newPos.y;
          }
        }
        if (this.data.showBorder) {
          ctx.beginPath();
          ctx.moveTo(0, newYPos);
          ctx.lineTo(canvasWidth, newYPos);
          ctx.stroke();
          // tslint:disable-next-line: no-shadowed-variable
          for (let i = 1; i < rowsBorderPosition.length; i++) {
            const border = rowsBorderPosition[i];
            ctx.beginPath();
            ctx.moveTo(border, startPos);
            ctx.lineTo(border, newYPos);
            ctx.stroke();
          }
        }
        startPos = newYPos;
      }
    }

    return startPos;
  }
}
export class ReceiptFieldFactory {
  static getFieled(rawFiled: { type: string; data: any }) {
    switch (rawFiled.type) {
      case '0':
        return new SimpleTextAreaFiled(rawFiled.data);
      case '1':
        return new DoubleTextAreaFiled(rawFiled.data);
      case '2':
        return new ComplexTextAreaFiled(rawFiled.data);
      case '3':
        return new IndentAreaFiled(rawFiled.data);
      case '4':
        return new LineAreaFiled(rawFiled.data);
      case '5':
        return new TableAreaFiled(rawFiled.data);
    }
  }
  static getFields(rawFiled: { type: string; data: any }[]) {
    return rawFiled.map((x) => this.getFieled(x));
  }
  static prepareTemplate(
    rawFields: { type: string; data: any }[],
    data: any
  ) {
    for (const rawField of rawFields) {
      if (rawField.type !== '5') {
        // tslint:disable-next-line: forin
        for (const key in data) {
          const regex = new RegExp(`#${key}#`);
          rawField.data = JSON.parse(
            JSON.stringify(rawField.data).replace(regex, data[key])
          );
        }
      } else {
        const tableRows = [];

        const rawRaw = rawField.data.data[0];

        for (const row of data.table) {
            let newRow = JSON.stringify(rawRaw);
            for (const column in row) {
              if (Object.prototype.hasOwnProperty.call(row, column)) {
                const regex = new RegExp(`#${column}#`);
                newRow =newRow.replace(regex,row[column]);
              }
            }
            tableRows.push(JSON.parse(newRow));
        }
        rawField.data.data = tableRows;
      }
    }
    return rawFields;
  }
}
function getTextSize(font, text, size, fontWeight) {
  const div = document.createElement('div');
  div.innerHTML = text;
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  div.style.left = '-9999px';
  div.style.fontFamily = font;
  div.style.fontWeight = fontWeight;
  div.style.fontSize = size + 'px'; // or 'px'
  document.body.appendChild(div);
  const sizeObj = [div.offsetWidth, div.offsetHeight];
  document.body.removeChild(div);

  console.log(sizeObj);
  return sizeObj;
}
