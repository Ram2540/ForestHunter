import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-enemy-data',
  templateUrl: './enemy-data.component.html',
  styleUrls: ['./enemy-data.component.css']
})
export class EnemyDataComponent implements OnInit, OnDestroy {
  enemyName = 'HERE IS A MONSTER NAME';
  MostersDownOnCurrentLevel = 0;
  MaxMosterOnLevel = 0;
  PercentHP = 0;
  EnemyHP = '0';
  FullHP = '0';
  EnemyCurrentLevel = 1;
  private storeEnemySubscriprion: Subscription;
  private storeHeroSubscriprion: Subscription;

  constructor(private store: Store<fromAppStore.AppState>, private helperService: HelperService) { }

  ngOnInit() {
    this.storeEnemySubscriprion = this.store.select('enemyState').subscribe((enemyState) => {
      this.PercentHP = enemyState.enemy.HP / enemyState.enemy.FullHP * 100;
      this.FullHP = this.helperService.getConvertedNumberToKs(enemyState.enemy.FullHP);
      this.EnemyHP = this.helperService.getConvertedNumberToKs(enemyState.enemy.HP);
      this.EnemyCurrentLevel = enemyState.enemy.level;
      this.enemyName = enemyState.enemy.name;
    });

    this.storeHeroSubscriprion = this.store.select('heroState').subscribe((heroState) => {
      this.MostersDownOnCurrentLevel = heroState.hero.mostersDownOnCurrentLevel;
      this.MaxMosterOnLevel = heroState.hero.maxMosterOnLevel;
    });

  }

  ngOnChnage() {
    this.PercentHP = this.PercentHP;
  }

  ngOnDestroy() {
    if (this.storeEnemySubscriprion) {
      this.storeEnemySubscriprion.unsubscribe();
    }

    if (this.storeHeroSubscriprion) {
      this.storeHeroSubscriprion.unsubscribe();
    }
  }
}
