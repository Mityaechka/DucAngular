import { CasherPlaceInfoComponent } from './../casher-place-info/casher-place-info.component';
import { TableService } from './../../../../../../services/table.service';
import { CasherPlaceCreateComponent } from './../casher-place-create/casher-place-create.component';
import { ShopsService } from 'src/app/services/shops.service';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { CasherPlace } from 'src/app/entities/casher-place.entity';

@Component({
  selector: 'app-casher-places',
  templateUrl: './casher-places.component.html',
  styleUrls: ['./casher-places.component.css'],
})
export class CasherPlacesComponent implements OnInit {
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.shopsService.getCasherPlaces();
  }
  createCasherPlace() {
    this.dialogs.push({
      component: CasherPlaceCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(async () => {
          this.tableService.tables.forEach((x) => x.table.loadData());
        });
      },
    });
  }
  async showCasherPlace(casherPlace: CasherPlace) {
    this.dialogs.startLoading();
    const response = await this.shopsService.getCasherPlace(casherPlace.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.push({
        component: CasherPlaceInfoComponent,
        data: response.result,
        onInstance: (i) => {
          i.edited.subscribe(async () => {
            this.tableService.tables.forEach((x) => x.table.loadData());
          });
        },
      });
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
