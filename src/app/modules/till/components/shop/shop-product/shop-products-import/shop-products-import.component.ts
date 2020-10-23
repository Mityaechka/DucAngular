import { HttpService } from './../../../../../../services/http.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-shop-products-import',
  templateUrl: './shop-products-import.component.html',
  styleUrls: ['./shop-products-import.component.css'],
})
export class ShopProductsImportComponent implements OnInit {
  properties = [
    { name: 'name', title: 'Название продукта' },
    { name: 'description', title: 'Описание' },
    { name: 'barcode', title: 'Штрих-код' },
    { name: 'price', title: 'Цена' },
    { name: 'markup', title: 'Наценка' },
    { name: 'category', title: 'Категория' },
  ];
  form = new FormGroup({
    file: new FormControl(undefined, [Validators.required]),
    name: new FormControl('0', [Validators.required]),
    description: new FormControl('0', [Validators.required]),
    barcode: new FormControl('0', [Validators.required]),
    price: new FormControl('0', [Validators.required]),
    markup: new FormControl('0', [Validators.required]),
    rootCategory: new FormControl('0', [Validators.required]),
    category: new FormControl('0', [Validators.required]),
    attributes: new FormArray([]),
  });
  get file() {
    return this.form.controls.file as FormControl;
  }
  get attribtes() {
    return this.form.controls.attributes as FormArray;
  }
  headers: { [index: number]: string } = {};
  isLoaded = false;
  constructor() {}

  ngOnInit(): void {
    this.file.valueChanges.subscribe((event) => {
      this.isLoaded = false;
      if (!event.files || event.files.length !== 1) {
        return;
      }

      const file = event.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result as any);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        this.headers = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        })[0] as any;
        this.isLoaded = true;
      };
      reader.readAsArrayBuffer(file);
    });
  }
  addAttribute() {
    this.attribtes.push(
      new FormGroup({
        value: new FormControl('', [Validators.required]),
        attributeId: new FormControl(undefined, [Validators.required]),
        attributeName: new FormControl(undefined, [Validators.required]),
      })
    );
  }
}
