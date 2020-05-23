import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Weapon } from 'src/app/classes/weapon';
import {HeroService} from '../../services/hero.service'

@Component({
  selector: 'app-weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent implements OnInit {
  @Input() weapon: Weapon;
  @Output() weaponClicked = new EventEmitter();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  levelUp() {
    this.heroService.levelUp(this.weapon.id);
    this.weaponClicked.emit();
  }
}
