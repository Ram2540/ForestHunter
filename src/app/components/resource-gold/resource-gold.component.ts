import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../services/hero.service'
@Component({
  selector: 'app-resource-gold',
  templateUrl: './resource-gold.component.html',
  styleUrls: ['./resource-gold.component.css']
})
export class ResourceGoldComponent implements OnInit {
  // resourceValue: number;
  // bonusValue: number;

  constructor(private heroService: HeroService) { }


  ngOnInit() {
    // this.resourceValue = this.heroService.getGold();
    // this.bonusValue = this.heroService.getGoldBonus();


    // setTimeout(() => { 
    //   this.resourceValue = this.heroService.getGold();
    //   this.bonusValue = this.heroService.getGoldBonus();

    // },5000);
  }
  getGold(): number {
    return this.heroService.getGold();
  }

  getGoldBonus(): number {
    return this.heroService.getGoldBonus();
  }

}
