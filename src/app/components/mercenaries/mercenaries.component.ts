import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ControllerActions } from 'src/app/store/controller/controller.actions';

@Component({
  selector: 'app-mercenaries',
  templateUrl: './mercenaries.component.html',
  styleUrls: ['./mercenaries.component.css']
})
export class MercenariesComponent implements OnInit, OnDestroy {
  nextToBuyWeapon: Weapon;
  weapons: Weapon[] = [];

  private currentVersionOfWeapons = -2;
  private heroStateSubscription: Subscription;
  private weaponStateSubscription: Subscription;

  private nextWeaponList: Weapon[] = [];

  constructor(
    private store: Store<fromAppStore.AppState>,
    private controllerActions: ControllerActions
  ) { }

  ngOnInit() {
    this.weaponStateSubscription = this.store.select('weaponsState').subscribe((weaponsState) => {
      this.initNextWeapons(weaponsState.nextWeaponsList);
    });

    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (heroState.hero && heroState.weaponVersion !== this.currentVersionOfWeapons) {
        this.currentVersionOfWeapons = heroState.weaponVersion;
        this.initWeapons(heroState.hero.weapons);
      }
    });
    this.initValues();
  }

  initValues() {
    this.initNextWeapons(this.controllerActions.getWeaponState().nextWeaponsList);
    this.initWeapons(this.controllerActions.getHeroState().hero.weapons);

  }

  initWeapons(weapons: Weapon[]) {
    this.weapons = weapons.filter(w => w.level > 0).sort((a, b) => a.id > b.id ? -1 : 1);
    const maxId = Math.max(...this.weapons.map(w => w.id + 1), 1);
    this.nextToBuyWeapon = this.nextWeaponList.find(w => w.id === maxId);
  }

  initNextWeapons(weapons: Weapon[]) {
    this.nextWeaponList = weapons;
  }

  ngOnDestroy() {
    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
    if (this.weaponStateSubscription) {
      this.weaponStateSubscription.unsubscribe();
    }
  }
}
