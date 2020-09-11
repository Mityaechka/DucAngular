import { DialogsService } from './../../../../../services/dialogs.service';
import { RequestService } from './../../../../../services/request.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProductRequest } from 'src/app/entities/product-request.entity';

@Component({
  selector: 'app-provider-request-info',
  templateUrl: './provider-request-info.component.html',
  styleUrls: ['./provider-request-info.component.css'],
})
export class ProviderRequestInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private request: ProductRequest,
    private requestService: RequestService,
    private dialogs: DialogsService
  ) {
  }

  async ngOnInit() {
  }
}
