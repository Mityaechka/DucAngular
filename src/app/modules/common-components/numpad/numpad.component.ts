import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumpadComponent implements OnInit {
  @Output() countEvent = new EventEmitter<number>();
  @Input() count = 0;

  constructor() {}

  ngOnInit(): void {}
  numberClick(value: number) {
    if (this.count === 0) {
      this.count = value;
    } else {
      this.count = Number.parseInt(this.count + value.toString(), 10);
    }

    this.countEvent.emit(this.count);
  }
  backspaceClick() {
    if (this.count > 0) {
      this.count = Math.floor(this.count / 10);
    }

    this.countEvent.emit(this.count);
  }
  clearClick() {
    this.count = 0;
    this.countEvent.emit(this.count);
  }
}
