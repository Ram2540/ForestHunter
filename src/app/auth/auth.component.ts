import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { RoutesService } from '../services/routes.service';
import { SharedDataService } from '../databaseSharedData/shared-data.service';
import * as fromAppStore from '../store/app-store';
import { Store } from '@ngrx/store';
//import * as fromHeroActions from '../store/hero/store-hero.actiobs';
import { Hero } from '../classes/hero';
import { SharedDataWeapons } from '../databaseSharedData/weaponsData';
//import * as fromEnemyActions from '../store/enemy/store-enemy.actions';
import { ControllerActions } from '../store/controller/controller.actions';
import { DataStorageService } from '../services/data-storage/data-storage.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isFormOpened = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  openFormSignIn = false;
  constructor(
    private authService: AuthService,
    private routesService: RoutesService,
    private store: Store<fromAppStore.AppState>,
    private controllerActions: ControllerActions,
    private dataStorageService: DataStorageService) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.error = null;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Promise<boolean | Observable<never>>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      const isPasswordTheSame = form.value.repeatpassword === form.value.password;
      if (!isPasswordTheSame) {
        this.error = 'passwords are different';
        return;
      }
      authObs = this.authService.signup(email, password);
    }
    authObs.then(
      () => {
        this.isLoading = false;
        this.isFormOpened = false;
      }).catch(
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );

    form.reset();
  }

  onOpenForm() {
    this.isFormOpened = !this.isFormOpened;
  }

  onSwitchLoginToSignUp() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogout(){
    this.authService.logout();
  }

  onTest() {
    // this.authService.onTest();
    // let testHero: Observable<{ hero: Hero }>;
    // testHero = this.store.select('heroState');

    // const hero = this.store.select('heroState');

    // console.log (testHero.subscribe((tttt) => {console.log(tttt); console.log('console.log(tttt);');}));
    // this.store.dispatch(new fromHeroActions.AddGoldBonus(999));
    // this.store.dispatch(new fromHeroActions.AddGold(500));
    // console.log(hero);
    // console.log (this.store.select('heroState').subscribe((tttt) => {console.log(tttt); console.log('console.log(tttt);');}));
    //   this.store.dispatch(new fromHeroActions.WeaponLevelUp(this.weaponService.getWeaponByIDandLevel(1,5)));
    //   console.log (this.store.select('heroState').subscribe((tttt) => {console.log(tttt); console.log('console.log(tttt);');}));
    // console.log(SharedDataWeapons.getWeaponByIDandLevel(2,2));
    
    this.controllerActions.EnemyGenerate(10);
    //this.dataStorageService.deleteData();
    // this.store.select('enemyState').subscribe(enemy => {
    //   console.log(enemy);
    // });
    //this.store.dispatch(new fromEnemyActions.GenerateEnemy(5));

    // this.store.select('enemyState').subscribe(enemy => {
    //   console.log(enemy);
    // });
  }
}
