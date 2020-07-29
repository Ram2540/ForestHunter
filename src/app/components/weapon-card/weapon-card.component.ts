import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit, OnDestroy {
  @Input() weapon: Weapon;
  currentGoldValue = 0;
  private goldSubscription: Subscription;

  constructor(private controllerActions: ControllerActions, private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
    this.goldSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.currentGoldValue !== heroState.hero.gold) {
        this.currentGoldValue = heroState.hero.gold;
      }
    });
  }

  levelUp() {
    this.controllerActions.HeroWeaponLevelUp(this.weapon);
  }
  ngOnDestroy() {
    this.goldSubscription.unsubscribe();
  }
}
