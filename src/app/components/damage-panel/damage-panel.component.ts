import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-damage-panel',
  templateUrl: './damage-panel.component.html',
  styleUrls: ['./damage-panel.component.css']
})
export class DamagePanelComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  public getDPSMultiplier() {
    return this.heroService.getDPSMultiplier();
  }

  public getDamage() {
    return this.heroService.getDamage();
  }

}
