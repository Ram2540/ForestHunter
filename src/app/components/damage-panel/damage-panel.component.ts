import { Component, OnInit } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-damage-panel',
  templateUrl: './damage-panel.component.html',
  styleUrls: ['./damage-panel.component.css']
})
export class DamagePanelComponent implements OnInit {
  DPSMultiplier = 0;
  Damage = 0;
  constructor(private store: Store<fromAppStore.AppState>, private gameService: GameService) { }

  ngOnInit() {
    this.store.select('heroState').subscribe((heroState) => {
      if (this.DPSMultiplier !== heroState.hero.DPSMultiplier) {
        this.DPSMultiplier = heroState.hero.DPSMultiplier;
      }
      if (this.Damage !== this.gameService.getHeroDamage) {
        this.Damage = this.gameService.getHeroDamage;
      }
    });
   }
}
