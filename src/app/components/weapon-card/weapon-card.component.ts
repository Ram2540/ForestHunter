import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() weapon: Weapon;
  currentGoldValue = 0;
  weaponDPS: string;
  weaponPrice: string;
  private goldSubscription: Subscription;

  constructor(private controllerActions: ControllerActions,
              private store: Store<fromAppStore.AppState>,
              private healperService: HelperService) { }

  ngOnInit() {
    this.goldSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.currentGoldValue !== heroState.hero.gold) {
        this.currentGoldValue = heroState.hero.gold;
      }
    });
    // this.weaponDPS = this.healperService.getConvertedNumberToKs(this.weapon.damage);
    // this.weaponPrice = this.healperService.getConvertedNumberToKs(this.weapon.price);
  }

  ngOnChanges() {
    this.weaponDPS = this.healperService.getConvertedNumberToKs(this.weapon.damage);
    this.weaponPrice = this.healperService.getConvertedNumberToKs(this.weapon.price);
  }

  levelUp() {
    this.controllerActions.HeroWeaponLevelUp(this.weapon);
  }
ngOnDestroy() {
    this.goldSubscription.unsubscribe();
  }
}
