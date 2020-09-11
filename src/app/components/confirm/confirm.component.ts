import { DialogsService } from 'src/app/services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; body: string; onOk: () => void },
    private dialogs: DialogsService
  ) {}

  ngOnInit(): void {}
  okClick() {
    this.data.onOk();
    this.dialogs.pop();
  }
}
