import { Component, OnInit } from '@angular/core';
import { Screens } from '../../enums/screens'

@Component({
  selector: 'app-tabs-all',
  templateUrl: './tabs-all.component.html',
  styleUrls: ['./tabs-all.component.css']
})
export class TabsAllComponent implements OnInit {
  tabs = [];
  constructor() { }

  ngOnInit() {
    this.getArrayOfStrings();
  }

  getArrayOfStrings() {

    if (this.tabs.length === 0) {
      let keys = Object.keys(Screens);
      this.tabs = keys.slice(keys.length / 2);
    }
    return this.tabs;

  }

}
