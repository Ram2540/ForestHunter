import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { Enemy } from '../../classes/enemy';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { GameService } from 'src/app/services/game.service';
import { EnemyHit } from './enemyHit.model';
import { GlobalSettings } from 'src/app/global-settings';


@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
  animations: [
    trigger('enemyState', [])
  ]
})
export class EnemyComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('self') self: ElementRef;
  imgEnemy = new Image();

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private isAnemyAlive = false ;
  private clicksArray: EnemyHit[] = [];
  private parentElement: HTMLElement;

  private maxState: number;
  private isDrawing = false;
  private currentDamage: string;
  private enemyMovingX = 0;
  private shiftEnemyMoveX: number;
  private enemyMovingY = 0;
  private shiftEnemyMoveY: number;
  private transarencyValue = 1;
  // Subscriptions
  private heroStateSubscription: Subscription;
  private enemyStateSubscription: Subscription;
  private intervalAdjustCanvas;
  private intervalAnimation;
  private intervalMovingEnemy;


  constructor(private store: Store<fromAppStore.AppState>,
              private gameService: GameService) { }

  ngOnInit() {
    this.intervalAdjustCanvas = setInterval(() => {
      this.adjustCanvasSizeToParent();
    }, GlobalSettings.enemyDrawDellayDrawing);

    this.intervalAnimation = setInterval(() => {
      this.drawAnimation();
    }, GlobalSettings.enemyDrawDellayDrawing);

    this.intervalMovingEnemy = setInterval(() => {
      this.moveEnemy();
    }, GlobalSettings.enemyDrawDellayMoving);

    this.shiftEnemyMoveX = GlobalSettings.enemyAnimationShiftEnemyMoveX;
    this.shiftEnemyMoveY = GlobalSettings.enemyAnimationShiftEnemyMoveY;
    this.maxState = GlobalSettings.enemyClickMaxState;


    this.enemyStateSubscription = this.store.select('enemyState').subscribe((enemyState) => {
      if (!this.imgEnemy || this.imgEnemy.src !== enemyState.enemy.url || this.isAnemyAlive !== enemyState.isEnemyAlive) {
        this.clicksArray = [];
        this.imgEnemy.src = enemyState.enemy.url;
        this.isAnemyAlive = enemyState.isEnemyAlive;
        this.transarencyValue = 1;
        this.isDrawing = false;
      } else if (!enemyState.isEnemyAlive && this.isAnemyAlive) {
        this.isAnemyAlive = enemyState.isEnemyAlive;
      }
    });

    this.heroStateSubscription = this.store.select('heroState').subscribe((heroState) => {
      if (this.currentDamage !== this.gameService.getHeroDamageConverted) {
        this.currentDamage = this.gameService.getHeroDamageConverted;
      }
    });

    this.initCanvas();
  }

  ngAfterViewInit() {
    this.parentElement = this.self.nativeElement.parentElement.parentElement;
  }

  drawAnimation() {
    if (!this.isDrawing) {
      this.isDrawing = true;
      if(!this.isAnemyAlive) {
        this.transarencyValue -= GlobalSettings.enemyAnimationDeathTransarencyChnagePerOneDraw;
      }
      this.ctx.globalAlpha = this.transarencyValue;

      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.imgEnemy) {
          this.ctx.drawImage(
            // source rectangle
            this.imgEnemy, -this.enemyMovingX, this.enemyMovingY, this.imgEnemy.width + this.enemyMovingX * 2, this.imgEnemy.height - this.enemyMovingY,
            GlobalSettings.enemyDrawImageMargin, GlobalSettings.enemyDrawImageMargin,
            this.canvas.width - 2 * GlobalSettings.enemyDrawImageMargin,
            this.canvas.height - 2 * GlobalSettings.enemyDrawImageMargin); // destination rectangle
        }
        this.drawAllClicks();
    }
      this.isDrawing = false;
    }
  }

moveEnemy() {
  if (this.isAnemyAlive) {
    // shift enemy image
    if (this.enemyMovingX > GlobalSettings.enemyAnimationMaxShiftX || this.enemyMovingX < 0) {
      this.shiftEnemyMoveX *= -1;
    }
    if (this.enemyMovingY > GlobalSettings.enemyAnimationMaxShiftY || this.enemyMovingY < 0) {
      this.shiftEnemyMoveY *= -1;
    }
    this.enemyMovingY += this.shiftEnemyMoveY;
    this.enemyMovingX += this.shiftEnemyMoveX;
  }
}


  clickEnemy(event: Event) {
    const coord = this.getMousePos(this.canvas, event);
    if (this.clicksArray.length < 100 || Math.random() < 0.25) {  // all hit move than 100 will be drawn with chance 25%
      this.clicksArray.push(new EnemyHit(coord.x, coord.y, this.currentDamage));
    }
    this.gameService.hitEnemy();
  }
  private getMousePos(canvas: HTMLCanvasElement, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  private adjustCanvasSizeToParent() {
    // These will change (scaling applied by the style)
    if (this.parentElement) {
      if (this.canvas.width !== this.parentElement.clientWidth || this.canvas.height !== this.parentElement.clientHeight) {
        this.initCanvas(this.parentElement.clientWidth, this.parentElement.clientHeight);
      }
    } else {
      this.parentElement = this.self.nativeElement.parentElement.parentElement;
    }
  }

  private initCanvas(newWidth?: number, newHeight?: number) {
    this.canvas = document.getElementById('enemy') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    if (newWidth) {
      this.canvas.width = newWidth;
    }
    if (newHeight) {
      this.canvas.height = newHeight;
    }
    this.ctx.font = '1.25rem Verdana';
  }

  private drawAllClicks() {
    if (this.clicksArray.length > 0) {
      this.clicksArray.forEach(c => {
        this.drawClick(c);
        c.nextState();
      });
      this.clicksArray = this.clicksArray.filter((c) => {
        return c.state < this.maxState;
      });
    }
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

    clearInterval(this.intervalAdjustCanvas);
    clearInterval(this.intervalAnimation);
    clearInterval(this.intervalMovingEnemy);
  }
}
