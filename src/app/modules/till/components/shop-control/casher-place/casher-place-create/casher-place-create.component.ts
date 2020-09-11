import { async } from '@angular/core/testing';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ShopsService } from 'src/app/services/shops.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-casher-place-create',
  templateUrl: './casher-place-create.component.html',
  styleUrls: ['./casher-place-create.component.css'],
})
export class CasherPlaceCreateComponent implements OnInit {
  nameControl = new FormControl('', [Validators.required]);
  @Output() created = new EventEmitter<number>();
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService
  ) {}

  ngOnInit(): void {}
  async createCasherPlace() {
    this.dialogs.startLoading();
    const response = await this.shopsService.createCasherPlace(
      this.nameControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
