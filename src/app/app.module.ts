import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

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
import { EnemyComponent } from './components/enemy/enemy.component';
import { EnemyDataComponent } from './components/enemy-data/enemy-data.component';
import { DamagePanelComponent } from './components/damage-panel/damage-panel.component';
import { LeftSideHeroComponent } from './components/left-side-hero/left-side-hero.component';
import { LeftSideQuestsComponent } from './components/left-side-quests/left-side-quests.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { StoreModule } from '@ngrx/store';
import * as fromStoreApp from './store/app-store';
import * as firebase from 'firebase';
import { ButtonHighlighterDirective } from './decorators/button-highlighter.directive';
import { DamageControlComponent } from './components/damage-control/damage-control.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
// import { GameService } from './services/game.service';

firebase.initializeApp(environment.firebaseConfig);

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
    LeftSideQuestsComponent,
    AuthComponent,
    ButtonHighlighterDirective,
    DamageControlComponent,
    RatingsComponent,
    AvatarComponent,
    UserStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // RouterModule,
    // RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(fromStoreApp.appReducer),
    DataTablesModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
