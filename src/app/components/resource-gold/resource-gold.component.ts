import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-gold',
  templateUrl: './resource-gold.component.html',
  styleUrls: ['./resource-gold.component.css']
})
export class ResourceGoldComponent implements OnInit, OnDestroy {
  resourceValue: number;
  bonusValue: number;
  private storeHeroSubscriprion: Subscription;
  constructor(private store: Store<fromAppStore.AppState>) { }


  ngOnInit() {
    this.store.select('heroState').subscribe((heroState) => {
      if(this.resourceValue !== heroState.hero.gold) {
        this.resourceValue = heroState.hero.gold;
      }
      if(this.bonusValue !== heroState.hero.goldBonus) {
        this.bonusValue = heroState.hero.goldBonus;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeHeroSubscriprion) {
      this.storeHeroSubscriprion.unsubscribe();
    }
  }
}
