import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-damage-control',
  templateUrl: './damage-control.component.html',
  styleUrls: ['./damage-control.component.css']
})
export class DamageControlComponent implements OnInit {
  constructor() { }
  @Input() damageControlData: DamageControl;

  ngOnInit(): void {
  }

}


export interface DamageControl {
  titile: string;
  damage: string;
  icon?: string;
  multiplier: string;
  multiplierInNumber: number;
  damageInNymber: number;
  description?: string;
  valueChanged: boolean;
}
