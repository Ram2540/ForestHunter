import { Component, Input, OnInit } from '@angular/core';
import { ElementTypes } from 'src/app/enums/elementTypes';
import { Item } from './item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item  = new Item(0);
  constructor() { }
  tooltip = '';

  ngOnInit(): void {
    if (this.item.itemEffects.length > 0) {
      if (this.item.itemName) {
        this.tooltip += this.item.itemName + '\n';
      }
      this.item.itemEffects.forEach(e => {
        this.tooltip += ElementTypes[e.effectType].toString() + ': ' + e.value.toString() + '% \n';
      });
    }
  }
}
