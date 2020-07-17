import { Component, OnInit, Input } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-resource-gold',
  templateUrl: './resource-gold.component.html',
  styleUrls: ['./resource-gold.component.css']
})
export class ResourceGoldComponent implements OnInit {
  resourceValue: number;
  bonusValue: number;

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
}
