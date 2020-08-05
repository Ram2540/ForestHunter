import { Component, OnInit, OnDestroy } from '@angular/core';
import {trigger } from '@angular/animations';
import { Enemy } from '../../classes/enemy';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
  animations: [
    trigger('enemyState', [])
  ]
})
export class EnemyComponent implements OnInit, OnDestroy {

  enemy: Enemy = new Enemy(1, 1);
  img = new Image();
  canvas: HTMLCanvasElement = document.getElementById('enemy') as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  positions: {
    x: number,
    y: number,
    width: number,
    height: number
  };
  private enemyStateSubscription: Subscription;

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
    this.enemyStateSubscription = this.store.select('enemyState').subscribe((enemyState) => {
      if (this.enemy !== enemyState.enemy) {
        if (this.enemy.url !== enemyState.enemy.url) {
          this.enemy = enemyState.enemy;
          this.drawEnemy();
        }
        else {
          this.enemy = enemyState.enemy;
        }
      }
    });

    this.canvas = <HTMLCanvasElement>document.getElementById("enemy");
    this.ctx = this.canvas.getContext("2d");

    this.img.onload = () => {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.img, 100, 30, 150, 100);
    }
    this.img.src = this.enemy.url;


  }
  ngOnDestroy() {
    if (this.enemyStateSubscription) {
      this.enemyStateSubscription.unsubscribe();
    }
  }

  drawEnemy(): void {
    this.img.src = this.enemy.url;
  }

  clickEnemy(event: Event) {
    //     console.log(event);
    // console.log(this.getMousePos(this.canvas,event));
  }
  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

}
