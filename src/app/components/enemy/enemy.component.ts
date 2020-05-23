import { Component, OnInit } from '@angular/core';
import { Enemy } from '../../classes/enemy'
import { EnemyService } from '../../services/enemy.service'

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit {
  enemy: Enemy;
  img = new Image;
  canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("enemy");
  ctx: CanvasRenderingContext2D;
  positions: {
    x: number,
    y: number,
    width: number,
    height: number
  };

  constructor(private enemyService: EnemyService) { }

  ngOnInit() {
    this.enemy = this.enemyService.getEnemy();
    this.canvas = <HTMLCanvasElement>document.getElementById("enemy");
    this.ctx = this.canvas.getContext("2d");



    this.img.onload = () => {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.img, 100, 30, 150, 100);
    }
    this.img.src = this.enemyService.getEnemy().url;
    //this.drawEnemy();

  }

  ngDoCheck(): void {
    const changes = this.enemy !== this.enemyService.getEnemy();
    if (changes) {
      this.drawEnemy();

    }
  }
  drawEnemy(): void {
    this.img.src = this.enemyService.getEnemy().url;
  }

  // drawClick(): void {
  //   "https://icon2.cleanpng.com/20171221/gzq/spot-light-effect-5a3c269dd233a5.025279141513891485861.jpg"
  // }

  clickEnemy(event: Event) {
    //     console.log(event);
    // console.log(this.getMousePos(this.canvas,event));
  }
  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };


  }
  // private initStartPositions(): void {
  //   this.positions.x = 50;
  //   this.positions.y = 30;
  //   this.positions.width = 150;
  //   this.positions.height = 100;
  // }
}
