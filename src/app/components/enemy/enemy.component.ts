import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger } from '@angular/animations';
import { Enemy } from '../../classes/enemy';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';

interface click {
  x: number;
  y: number;
  state: number;
}
@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
  animations: [
    trigger('enemyState', [])
  ]
})
export class EnemyComponent implements OnInit, OnDestroy {
  @ViewChild('self') self: ElementRef;

  constructor(private store: Store<fromAppStore.AppState>) { }

  enemy: Enemy = new Enemy(1, 1);
  img = new Image();

  canvas: HTMLCanvasElement; // = document.getElementById('enemy') as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  positions: {
    x: number,
    y: number,
    width: number,
    height: number
  };
  private enemyStateSubscription: Subscription;
  private clicksArray: click[] = [];
  private parentElement: HTMLElement;
  private imageMargin = 50;
  private maxState = 250;
  private isDrawing = false;

  ngOnInit() {
    setInterval(() => {
      this.adjustCanvasSizeToParent();
    }, 100);

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
      if (!this.isDrawing) {
        this.isDrawing = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,     // source rectangle
          this.imageMargin, this.imageMargin,
          this.canvas.width - 2 * this.imageMargin,
          this.canvas.height - 2 * this.imageMargin); // destination rectangle
        this.drawAllClicks();
        if (this.clicksArray.length > 0) {
          this.drawEnemy();
        }
        this.isDrawing = false;
      }
    };
    this.img.src = this.enemy.url;
  }

  ngAfterViewInit() {
    this.parentElement = this.self.nativeElement.parentElement.parentElement;
  }

  drawEnemy(): void {
    this.img.src = this.enemy.url;
  }


  clickEnemy(event: Event) {
    const coord = this.getMousePos(this.canvas, event);
    this.clicksArray.push({ x: coord.x, y: coord.y, state: 0 } as click);
    if (!this.isDrawing) {
      this.drawEnemy();
    }
  }
  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  adjustCanvasSizeToParent() {
    // These will change (scaling applied by the style)
    if (this.parentElement) {
      let needDraw = false;
      if (this.canvas.width !== this.parentElement.clientWidth) {
        this.canvas.width = this.parentElement.clientWidth;
        needDraw = true;
      }
      if (this.canvas.height !== this.parentElement.clientHeight) {
        this.canvas.height = this.parentElement.clientHeight;
        needDraw = true;
      }
      if (needDraw && !this.isDrawing) {
        this.drawEnemy();
      }
    } else {
      this.parentElement = this.self.nativeElement.parentElement.parentElement;
    }
  }

  private drawAllClicks() {
    this.clicksArray.forEach(c => {
      this.drawClick(c.x, c.y, c.state);
      c.state++;
    });
    this.clicksArray = this.clicksArray.filter((c) => {
      return c.state < this.maxState;
    });
    if (this.clicksArray.length === 0) {
      this.drawEnemy();
    }
  }

  private drawClick(x: number, y: number, state: number): void {
    this.ctx.fillStyle = `rgb(
      ${Math.floor(0 + state)},
      ${Math.floor(255 - state)},
      ${Math.floor(0 + state)})`;
    this.ctx.fillRect(x , y , 10, 10);
  }
  ngOnDestroy() {
    if (this.enemyStateSubscription) {
      this.enemyStateSubscription.unsubscribe();
    }
  }
}
