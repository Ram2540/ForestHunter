import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-weapons-box',
  templateUrl: './all-weapons-box.component.html',
  styleUrls: ['./all-weapons-box.component.css']
})
export class AllWeaponsBoxComponent implements OnInit, OnDestroy {
  nextToBuyWeapon: Weapon;
  weapons: Weapon[] = [];

  private currentVersionOfWeapons = -1;
  private heroStateSubscription: Subscription;

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {

      if (heroState.hero && heroState.weaponVersion !== this.currentVersionOfWeapons) {
      this.weapons = heroState.hero.weapons.filter(w => w.level > 0).sort((a, b) => a.id > b.id ? -1 : 1);
      this.nextToBuyWeapon = heroState.hero.weapons.filter(w => w.level === 0).sort((n1, n2) => {
        if (n1.price > n2.price) {
          return 1;
        }
        if (n1.price < n2.price) {
          return -1;
        }
        return 0;
      })[0];
    }
    });
  }

  ngOnDestroy() {
    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
  }
}
