import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { InterpolationConfig } from '@angular/compiler';
import { DamageControl } from '../damage-control/damage-control.component';

@Component({
  selector: 'app-damage-panel',
  templateUrl: './damage-panel.component.html',
  styleUrls: ['./damage-panel.component.css']
})
export class DamagePanelComponent implements OnInit, OnDestroy {
  damagePanelList: DamageControl[] = [];
  private DPSIndex = 0;
  private DPCindex = 1;
  private heroStateSubscription: Subscription;
  constructor(private store: Store<fromAppStore.AppState>, private gameService: GameService, private helperService: HelperService) { }

  ngOnInit() {
    const damageControlDPC: DamageControl = {
      titile: 'DPC',
      damage: '0',
      icon: '',
      multiplier: '0',
      multiplierInNumber: 0,
      damageInNymber: 0,
      description: 'Damage per click',
      valueChanged: false
    };

    const damageControlDPS: DamageControl = {
      titile: 'DPS',
      damage: '0',
      icon: 'dps-icon.png',
      multiplier: '0',
      multiplierInNumber: 0,
      damageInNymber: 0,
      description: 'Damage per second',
      valueChanged: false
    };
    this.damagePanelList[this.DPSIndex] = damageControlDPS;
    this.damagePanelList[this.DPCindex] = damageControlDPC;
    // DPS
    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.damagePanelList[this.DPSIndex].multiplierInNumber !== heroState.hero.DPSMultiplier
        || this.damagePanelList[this.DPSIndex].damageInNymber !== this.gameService.getHeroDamage) {

        this.damagePanelList[this.DPSIndex].multiplierInNumber = heroState.hero.DPSMultiplier;
        this.damagePanelList[this.DPSIndex].multiplier = this.helperService.getConvertedNumberToKs(heroState.hero.DPSMultiplier);

        this.damagePanelList[this.DPSIndex].damageInNymber = this.gameService.getHeroDamage;
        this.damagePanelList[this.DPSIndex].damage = this.helperService.getConvertedNumberToKs(this.gameService.getHeroDamage);

        this.damagePanelList[this.DPSIndex].valueChanged = true;

        setTimeout(() => {
          this.damagePanelList[this.DPSIndex].valueChanged = false;
        }, 600);
      }
    });
  }

  ngOnDestroy() {
    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
  }
}
