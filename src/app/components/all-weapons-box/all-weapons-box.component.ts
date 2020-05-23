import { Component, OnInit, OnChanges } from '@angular/core';
import { HeroService } from '../../services/hero.service'
import { Weapon } from 'src/app/classes/weapon';

@Component({
  selector: 'app-all-weapons-box',
  templateUrl: './all-weapons-box.component.html',
  styleUrls: ['./all-weapons-box.component.css']
})
export class AllWeaponsBoxComponent implements OnInit {
  nextToBuyWeapon: Weapon;
  weapons: Weapon[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.onUpdateData();
    this.heroService.weaponsChanged.subscribe(
      (newWeapons:Weapon[]) => {
        //this.weapons= newWeapons;
        this.onUpdateData()
      }
    )

    /*----------------------------------TEST for reload-------------------------- */
    setInterval(() => {
      this.onUpdateData()
    }, 15000);

  }

  onUpdateData() {
    this.nextToBuyWeapon = this.heroService.getNextWeaponToBuy();
    this.weapons = this.heroService.getHeroWeapons();
  }

}
