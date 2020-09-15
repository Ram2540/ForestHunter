import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { WeaponService } from 'src/app/services/weapon.service';

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() weapon: Weapon;
  @Input() isThisNextWeapon = false;
  currentGoldValue = 0;
  weaponDPS: string;
  weaponPrice: string;
 

  private goldSubscription: Subscription;

  constructor(private controllerActions: ControllerActions,
              private store: Store<fromAppStore.AppState>,
              private healperService: HelperService,
              private weaponService: WeaponService) { }

  ngOnInit() {
    this.goldSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.currentGoldValue !== heroState.hero.gold) {
        this.currentGoldValue = heroState.hero.gold;
      }
    });
  }

  ngOnChanges() {
    this.weaponDPS = this.healperService.getConvertedNumberToKs(this.weapon.damage);
    this.weaponPrice = this.healperService.getConvertedNumberToKs(this.weapon.price);
  }

  levelUp() {
    const level = this.isThisNextWeapon ? 1 : this.weapon.level + 1;
    const updatedWeapon = this.weaponService.getWeaponByIDandLevel(this.weapon.id, level);
    if (updatedWeapon) {
      this.controllerActions.HeroWeaponLevelUp(updatedWeapon);
    }
  }

ngOnDestroy() {
    this.goldSubscription.unsubscribe();
  }
}
