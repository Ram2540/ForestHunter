import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../item/item.model';
import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDropList, CdkDropListGroup, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalSettings } from 'src/app/global-settings';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public inventoryAllItems: Item[][] = [];
 
  
  public inventoryItems1: Item[] = [];
  public inventoryItems2: Item[] = [];
  public inventoryItems3: Item[] = [];
  public inventoryItems4: Item[] = [];
  public inventoryItems5: Item[] = [];
  public inventoryItems6: Item[] = [];
  public heroEquipmentItems1: Item[] = [];
  public heroEquipmentItems2: Item[] = [];

  constructor() { }
  ngOnInit(): void {
    // const RingUrl = 'https://i.pinimg.com/originals/69/f2/0d/69f20d82197df4b40fec866e18324d39.png';
    for (let i = 1; i <= GlobalSettings.equipmentMaxAmountOfItems; i++) {
      this.heroEquipmentItems1.push(new Item(i));
      this.heroEquipmentItems2.push(new Item(i));
    }

    for (let i = 1; i <= GlobalSettings.inventoryMaxAmountOfItems; i++) {
      const item = new Item(i);
      // TEST
      if (i % 2 === 0) {
        item.itemImgUrl = 'https://i.pinimg.com/originals/69/f2/0d/69f20d82197df4b40fec866e18324d39.png';
        this.heroEquipmentItems1[i % GlobalSettings.equipmentMaxAmountOfItems] = item;
        this.heroEquipmentItems2[i % GlobalSettings.equipmentMaxAmountOfItems] = item;
      }
      if (i % 3 === 0) {
        item.itemImgUrl = 'https://www.jing.fm/clipimg/full/125-1257532_cartoon-knight-helmet-clipart-middle-ages-knight-helmet.png';
      }
      this.inventoryItems1.push(item);
    }
    this.inventoryItems2.push(...this.inventoryItems1);
    this.inventoryItems3.push(...this.inventoryItems1);
    this.inventoryItems4.push(...this.inventoryItems1);
    this.inventoryItems5.push(...this.inventoryItems1);
    this.inventoryItems6.push(...this.inventoryItems1);

    this.inventoryAllItems.push(this.inventoryItems1);
    this.inventoryAllItems.push(this.inventoryItems2);
    this.inventoryAllItems.push(this.inventoryItems3);
    this.inventoryAllItems.push(this.inventoryItems4);
    this.inventoryAllItems.push(this.inventoryItems5);
    this.inventoryAllItems.push(this.inventoryItems6);

  }
// cdkDropListEnterPredicate
// Function that is used to determine whether an item is allowed to be moved into a drop container.


  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex + 1,
        event.previousIndex
      );
    }
  }
}
