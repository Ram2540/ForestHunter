import { Component, OnInit, HostBinding } from '@angular/core';
import {EnemyService} from '../../services/enemy.service'

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

  // getEnemyHPPercentage() {
  //    return this.enemyService.getPercentHP();
  //   return 25;
  // }


}
