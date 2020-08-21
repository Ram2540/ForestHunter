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

  constructor(private store: Store<fromAppStore.AppState>) { }

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
  private clicksArray = [];

// private ball = {
//     x: 100,
//     y: 100,
//     radius: 25,
//     color: 'blue',
//     draw() {
//       this.ctx.beginPath();
//       this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//       this.ctx.closePath();
//       this.ctx.fillStyle = this.color;
//       this.ctx.fill();
//     }
//   };

  ngOnInit() {
    this.enemyStateSubscription = this.store.select('enemyState').subscribe((enemyState) => {
      if (this.enemy !== enemyState.enemy) {
        if (this.enemy.url !== enemyState.enemy.url) {
          this.enemy = enemyState.enemy;
          this.drawEnemy();
        } else {
          this.enemy = enemyState.enemy;
        }
      }
    });

    this.canvas = document.getElementById('enemy') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.img.onload = () => {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.img, 100, 30, 250, 250);
    };
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
         console.log(event);
         const coord = this.getMousePos(this.canvas, event);
         this.draw(coord.x, coord.y, 'blue');
  }
  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


  draw(x: number, y: number, color: string): void {
    console.log(x, y);
    this.canvas = document.getElementById('enemy') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 600;
    // this.ctx.beginPath();
    // this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    // this.ctx.closePath();
    // this.ctx.fillStyle = color;
    // this.ctx.fill();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 10, 10);
    this.ctx.fillRect(10, 10, 10, 10);
    console.log(this.canvas.width, this.canvas.width);
  }

}
