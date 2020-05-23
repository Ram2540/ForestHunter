import { Component, OnInit } from '@angular/core';
import {EnemyService} from '../../services/enemy.service'

@Component({
  selector: 'app-battle-field',
  templateUrl: './battle-field.component.html',
  styleUrls: ['./battle-field.component.css']
})
export class BattleFieldComponent implements OnInit {

  constructor(private enemyService: EnemyService) { }

  ngOnInit() {
  }

}
