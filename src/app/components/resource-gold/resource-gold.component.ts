import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-resource-gold',
  templateUrl: './resource-gold.component.html',
  styleUrls: ['./resource-gold.component.css']
})
export class ResourceGoldComponent implements OnInit {
  resourceValue: number;
  // bonusValue: number;

  constructor(private heroService: HeroService, private store: Store<fromAppStore.AppState>) { }


  ngOnInit() {
  }
  getGold(): number {
    return this.heroService.getGold();
  }

  getGoldBonus(): number {
    return this.heroService.getGoldBonus();
  }

}
