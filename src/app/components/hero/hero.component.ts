import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalSettings } from 'src/app/global-settings';
import { TestData } from 'src/app/Trash/testData';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
 
  public heroEquipmentItems1: Item[] = [];
  public heroEquipmentItems2: Item[] = [];

  public inventoryAllItems: Item[][] = [];

  constructor(private controllerActions: ControllerActions) { }
  ngOnInit(): void {
    for (let i = 1; i <= GlobalSettings.equipmentMaxAmountOfItems; i++) {
      this.heroEquipmentItems1.push(new Item(i));
      this.heroEquipmentItems2.push(new Item(i));
    }

    const testData = new TestData();

    const testInveventories = testData.getItems();
    let index = 0;
    for (let i = 0; i < 6; i++) {
      const inventoryItems: Item[] = [];
      for (let j = 0; j < GlobalSettings.inventoryMaxAmountOfItems; j++) {
        if (testInveventories.length > index) {
          inventoryItems.push(testInveventories[index]);
          index++;
        } else {
          inventoryItems.push(new Item(0));
        }
      }
      this.inventoryAllItems.push(inventoryItems);
    }

    this.updateStates();
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
      this.updateStates();
    }
  }

  private updateStates() {
    this.controllerActions.HeroStatsCalculate([...this.heroEquipmentItems1, ...this.heroEquipmentItems2]);
  }
}
