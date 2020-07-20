import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-damage-panel',
  templateUrl: './damage-panel.component.html',
  styleUrls: ['./damage-panel.component.css']
})
export class DamagePanelComponent implements OnInit, OnDestroy {
  DPSMultiplier = 0;
  Damage = 0;
  private heroStateSubscription: Subscription;
  constructor(private store: Store<fromAppStore.AppState>, private gameService: GameService) { }

  ngOnInit() {
    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.DPSMultiplier !== heroState.hero.DPSMultiplier) {
        this.DPSMultiplier = heroState.hero.DPSMultiplier;
      }
      if (this.Damage !== this.gameService.getHeroDamage) {
        this.Damage = this.gameService.getHeroDamage;
      }
    });
   }

   ngOnDestroy() {
     if(this.heroStateSubscription){
       this.heroStateSubscription.unsubscribe();
     }
   }
}
