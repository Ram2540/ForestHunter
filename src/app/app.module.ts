import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattleFieldComponent } from './components/battle-field/battle-field.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ResourcePanelComponent } from './components/resource-panel/resource-panel.component';
import { ResourceGoldComponent } from './components/resource-gold/resource-gold.component';
import { TabsAllComponent } from './components/tabs-all/tabs-all.component';
import { RightSideComponent } from './components/right-side/right-side.component';
import { HeroComponent } from './components/hero/hero.component';
import { WeaponCardComponent } from './components/weapon-card/weapon-card.component';
import { AllWeaponsBoxComponent } from './components/all-weapons-box/all-weapons-box.component';
import { BuyButtonComponent } from './components/buttons/buy-button/buy-button.component';
import { TextButtonComponent } from './components/buttons/text-button/text-button.component';
import { TabComponent } from './components/tab/tab.component';
import { HeroService } from './services/hero.service'
import { GoldService } from './services/gold.service'
import { EnemyService } from './services/enemy.service';
import { EnemyComponent } from './components/enemy/enemy.component';
import { EnemyDataComponent } from './components/enemy-data/enemy-data.component';
import { DamagePanelComponent } from './components/damage-panel/damage-panel.component';
import { LeftSideHeroComponent } from './components/left-side-hero/left-side-hero.component';
import { LeftSideQuestsComponent } from './components/left-side-quests/left-side-quests.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    BattleFieldComponent,
    TopMenuComponent,
    ResourcePanelComponent,
    ResourceGoldComponent,
    TabsAllComponent,
    RightSideComponent,
    HeroComponent,
    WeaponCardComponent,
    AllWeaponsBoxComponent,
    BuyButtonComponent,
    TextButtonComponent,
    TabComponent,
    EnemyComponent,
    EnemyDataComponent,
    DamagePanelComponent,
    LeftSideHeroComponent,
    LeftSideQuestsComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule,
    // RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [
    HeroService,
    GoldService,
    EnemyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
