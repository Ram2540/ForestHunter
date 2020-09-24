import { Component, OnInit } from '@angular/core';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-hero-stats',
  templateUrl: './hero-stats.component.html',
  styleUrls: ['./hero-stats.component.css']
})
export class HeroStatsComponent implements OnInit {

  constructor(private store: Store<fromAppStore.AppState>) { }

  listOfStats: string[] = [];
  private statVersion = -1;
  ngOnInit(): void {
    this.store.select('heroState').subscribe(heroState => {
      if (this.statVersion < heroState.heroStatsVersion) {
        this.listOfStats = [];
        heroState.heroStats.map(s => {
          this.listOfStats.push(''.concat(s.statName, ': ', s.value.toString(), s.isPrcent ? '%' : ''));
        });
        this.statVersion = heroState.heroStatsVersion;
      }
    });

  }
}
