import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import {HeroService} from '../../services/hero.service';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import * as fromHeroActions from '../../store/hero/store-hero.actiobs';

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit {
  @Input() weapon: Weapon;
  @Output() weaponClicked = new EventEmitter();

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
  }

  levelUp() {
    this.store.dispatch(new fromHeroActions.WeaponLevelUp(this.weapon))
    this.weaponClicked.emit();
  }
}
