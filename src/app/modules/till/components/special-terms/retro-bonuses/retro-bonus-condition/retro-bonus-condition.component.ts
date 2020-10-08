import { Component, Inject, Input, OnInit } from '@angular/core';
import { RetroBonusType, SellOut } from 'src/app/entities/retro-bonus/retro-bonus.entity';
import { EnumCollection, EnumDisplayCollection } from 'src/app/enums/enum-display.collection';

@Component({
  selector: 'app-retro-bonus-condition',
  templateUrl: './retro-bonus-condition.component.html',
  styleUrls: ['./retro-bonus-condition.component.css'],
})
export class RetroBonusConditionComponent implements OnInit {
  @Input() type: RetroBonusType;
  EnumDisplayCollection = EnumDisplayCollection;
  EnumCollection = EnumCollection;
  constructor() {}

  ngOnInit(): void {
  }
}
