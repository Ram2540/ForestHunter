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
  CurrentEnemy: Enemy;
  img = new Image();

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private clicksArray: EnemyHit[] = [];
  private parentElement: HTMLElement;
  private imageMargin = 70;
  private maxState = 30;
  private isDrawing = false;
  private currentDamage: string;
  private dellayDrawing = 70;
  // animation of image  values
  private enemyMovingX = 0;
  private shiftEnemyMoveX = 2;
  private enemyMaxShiftX = 20;
  private enemyMovingY = 0;
  private shiftEnemyMoveY = 1;
  private enemyMaxShiftY = 10;
  // Subscriptions
  private heroStateSubscription: Subscription;
  private enemyStateSubscription: Subscription;
  private intervalAdjustCanvas;
  private intervalAnimation;

  constructor(private store: Store<fromAppStore.AppState>,
    private gameService: GameService) { }

  ngOnInit() {
    this.intervalAdjustCanvas = setInterval(() => {
      this.adjustCanvasSizeToParent();
    }, this.dellayDrawing);

    this.intervalAnimation = setInterval(() => {
      this.drawAnimation();
    }, this.dellayDrawing);


    this.enemyStateSubscription = this.store.select('enemyState').subscribe((enemyState) => {
      if (!this.CurrentEnemy || this.CurrentEnemy !== enemyState.enemy || this.CurrentEnemy.url !== enemyState.enemy.url) {
        this.CurrentEnemy = enemyState.enemy;
        this.img.src = this.CurrentEnemy.url;
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

  // drawEnemy(): void {
  //   this.img.src = this.enemy.url;
  // }

  drawAnimation() {
    if (!this.isDrawing) {
      this.isDrawing = true;
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.img) {
          this.ctx.drawImage(this.img, -this.enemyMovingX, this.enemyMovingY, this.img.width + this.enemyMovingX * 2, this.img.height - this.enemyMovingY, // source rectangle
            this.imageMargin, this.imageMargin,
            this.canvas.width - 2 * this.imageMargin,
            this.canvas.height - 2 * this.imageMargin); // destination rectangle
        }
        this.drawAllClicks();

        // shift enemy image
        if (this.enemyMovingX > this.enemyMaxShiftX || this.enemyMovingX < 0) {
          this.shiftEnemyMoveX *= -1;
        }
        if (this.enemyMovingY > this.enemyMaxShiftY || this.enemyMovingY < 0) {
          this.shiftEnemyMoveY *= -1;
        }
        this.enemyMovingY += this.shiftEnemyMoveY;
        this.enemyMovingX += this.shiftEnemyMoveX;
      }
      this.isDrawing = false;
    }
  }


  clickEnemy(event: Event) {
    const coord = this.getMousePos(this.canvas, event);
    if (this.clicksArray.length < 100 || Math.random() < 0.25) {  // all hit move than 100 will be drawn with chance 25%
      this.clicksArray.push(new EnemyHit(coord.x, coord.y, this.currentDamage));
    }
    this.gameService.hitEnemy();
  }
  private getMousePos(canvas, evt) {
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
  }
}
