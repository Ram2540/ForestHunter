import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-resource-gold',
  templateUrl: './resource-gold.component.html',
  styleUrls: ['./resource-gold.component.css']
})
export class ResourceGoldComponent implements OnInit, OnDestroy {
  // @Input() resourceValue: number;
  // @Input() resourceBonusValue: number;
  resourceValue: string;
  private gold: number;
  bonusValue: string;
  private bonusGold: number;
  private storeHeroSubscriprion: Subscription;
  constructor(private store: Store<fromAppStore.AppState>,
              private healperService: HelperService) { }


  ngOnInit() {
    this.store.select('heroState').subscribe((heroState) => {
      if(this.gold !== heroState.hero.gold) {
        this.gold = heroState.hero.gold;
        this.resourceValue = this.healperService.getConvertedNumberToKs(heroState.hero.gold);
      }
      if(this.bonusGold !== heroState.hero.goldBonus) {
        this.bonusGold = heroState.hero.goldBonus;
        this.bonusValue = this.healperService.getConvertedNumberToKs(heroState.hero.goldBonus);
      }
    });
  }

  ngOnDestroy() {
    if (this.storeHeroSubscriprion) {
      this.storeHeroSubscriprion.unsubscribe();
    }
  }
}
