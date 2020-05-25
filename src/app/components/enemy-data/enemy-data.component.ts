import { Component, OnInit, HostBinding } from '@angular/core';
import { EnemyService } from '../../services/enemy.service'

@Component({
  selector: 'app-enemy-data',
  templateUrl: './enemy-data.component.html',
  styleUrls: ['./enemy-data.component.css']
})
export class EnemyDataComponent implements OnInit {
  // @HostBinding 
  constructor(private enemyService: EnemyService) { }

  ngOnInit() {
  }

  public getMostersDownOnCurrentLevel() {
    return this.enemyService.getMostersDownOnCurrentLevel();
  }

  public getMaxMosterOnLevel() {
    return this.enemyService.getMaxMosterOnLevel()
  }

  public getPercentHP() {
    return this.enemyService.getPercentHP()
  }

  public getEnemyHP() {
    return this.enemyService.getEnemyHP()
  }

  public getFullHP() {
    return this.enemyService.getFullHP()
  }

  public getCurrentLevel() {
    return this.enemyService.getCurrentLevel()
  }
}
