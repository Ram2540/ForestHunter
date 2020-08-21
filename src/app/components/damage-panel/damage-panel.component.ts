import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-damage-panel',
  templateUrl: './damage-panel.component.html',
  styleUrls: ['./damage-panel.component.css']
})
export class DamagePanelComponent implements OnInit, OnDestroy {
  DPSMultiplier = '0';
  Damage = '0';
  private damageInNumber = 0;  // just for checking
  private DPSMultiplierInNumber = 0;  // just for checking
  private heroStateSubscription: Subscription;
  constructor(private store: Store<fromAppStore.AppState>, private gameService: GameService, private helperService: HelperService) { }

  ngOnInit() {
    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.DPSMultiplierInNumber !== heroState.hero.DPSMultiplier) {
        this.DPSMultiplierInNumber = heroState.hero.DPSMultiplier;
        this.DPSMultiplier = this.helperService.getConvertedNumberToKs(heroState.hero.DPSMultiplier);
      }
      if (this.damageInNumber !== this.gameService.getHeroDamage) {
        this.damageInNumber = this.gameService.getHeroDamage;
        this.Damage = this.helperService.getConvertedNumberToKs(this.gameService.getHeroDamage);
      }
    });
  }

  ngOnDestroy() {
    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
  }
}
