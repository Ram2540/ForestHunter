import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger } from '@angular/animations';
import { Enemy } from '../../classes/enemy';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { GameService } from 'src/app/services/game.service';
import { EnemyHit } from './enemyHit.model';


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

  constructor(private store: Store<fromAppStore.AppState>,
    private gameService: GameService) { }

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
  private clicksArray: EnemyHit[] = [];
  private parentElement: HTMLElement;
  private imageMargin = 50;
  private maxState = 30;
  private isDrawing = false;
  private currentDamage: string;
  private dellayDrawing = 70;
  private heroStateSubscription: Subscription;

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

    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.currentDamage !== this.gameService.getHeroDamageConverted) {
        this.currentDamage = this.gameService.getHeroDamageConverted;
      }
    });

    this.canvas = document.getElementById('enemy') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.img.onload = () => {
      if (!this.isDrawing) {
        this.isDrawing = true;
        setTimeout(() => {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,     // source rectangle
            this.imageMargin, this.imageMargin,
            this.canvas.width - 2 * this.imageMargin,
            this.canvas.height - 2 * this.imageMargin); // destination rectangle
          this.drawAllClicks();
          this.isDrawing = false;
          if (this.clicksArray.length > 0) {
            this.drawEnemy();
          }
        }, this.dellayDrawing);
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
    this.clicksArray.push(new EnemyHit(coord.x, coord.y, this.currentDamage));
    this.drawEnemy();
    this.gameService.hitEnemy();
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
      if (this.canvas.width !== this.parentElement.clientWidth || this.canvas.height !== this.parentElement.clientHeight) {
        this.canvas.width = this.parentElement.clientWidth;
        this.canvas.height = this.parentElement.clientHeight;
        this.initCanvas();
      }
    } else {
      this.parentElement = this.self.nativeElement.parentElement.parentElement;
    }
  }

  private initCanvas() {
    this.ctx.font = '1rem Verdana';
    this.drawEnemy();
  }

  private drawAllClicks() {
    this.clicksArray.forEach(c => {
      this.drawClick(c);
      c.nextState();
    });
    this.clicksArray = this.clicksArray.filter((c) => {
      return c.state < this.maxState;
    });
  }

  private drawClick(h: EnemyHit): void {
    this.ctx.fillStyle = `rgb(
      ${Math.floor(0 + h.state * Math.floor(255 / this.maxState))},
      ${Math.floor(255 - h.state * Math.floor(255 / this.maxState))},
      ${Math.floor(0 + h.state * Math.floor(255 / this.maxState))})`;
    this.ctx.fillText(h.text, h.x - 20, h.y + 5);
  }
  ngOnDestroy() {
    if (this.enemyStateSubscription) {
      this.enemyStateSubscription.unsubscribe();
    }

    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
  }
}
