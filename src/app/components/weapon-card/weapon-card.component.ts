import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit {
  @Input() weapon: Weapon;
  //@Output() weaponClicked = new EventEmitter();

  constructor(private controllerActions: ControllerActions) { }

  ngOnInit() {
  }

  levelUp() {
    this.controllerActions.HeroWeaponLevelUp(this.weapon);
    //this.weaponClicked.emit();
  }
}
