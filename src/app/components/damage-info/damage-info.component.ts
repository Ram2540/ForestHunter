import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-damage-info',
  templateUrl: './damage-info.component.html',
  styleUrls: ['./damage-info.component.css']
})
export class DamageInfoComponent implements OnInit {
  listOfDataExplanation: string[] = [];
  private maxValue = 100;
  private amountShowingValues = 15;
  constructor() { }

  ngOnInit(): void {
    this.fillData();
  }

  private fillData() {
    this.listOfDataExplanation.push('1000 = 1K1');
    for (let i = 1; i < this.amountShowingValues - 2; i++) {
      this.listOfDataExplanation.push('1000K' + i + ' = 1K' + (i + 1));
    }
    this.listOfDataExplanation.push('....................');
    this.listOfDataExplanation.push('1000K' + (this.maxValue - 1) + ' = 1K' + this.maxValue);
  }

}
