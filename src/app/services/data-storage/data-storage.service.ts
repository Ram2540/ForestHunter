import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../classes/hero';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { DatabaseDataLinks } from './database-enums';
import { SharedDataService } from 'src/app/databaseSharedData/shared-data.service';
import { enemyReward } from 'src/app/databaseSharedData/gold';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Ratings } from '../../components/ratings/ratings.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // private urlFirebase = 'https://foresthunter-f42be.firebaseio.com/';
  public enemyRewards = new BehaviorSubject<enemyReward[]>(null);

  private subscriptionToUser: Subscription;

  private get heroDBRefData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.Hero));
  }
  private get enemyLogDBData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.EnemyLog) + new Date().getTime().toString());
  }
  private get weaponLogDBData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.WeaponLog) + new Date().getTime().toString());
  }
  private get ratingsDBRefAllRatings() {
    return this.getRef(this.getRefForRatingsGeneral());
  }
  private get ratingsDBRefGeneralUserData() {
    return this.getRef(this.getRefForGeneralUserRating());
  }

  constructor(private http: HttpClient,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private store: Store<fromAppStore.AppState>,
    private controllerActions: ControllerActions) {

    this.subscriptionToUser = this.store.select('authState').subscribe((authState) => {
      if (authState.user) {
        this.tryToPostNewHeroOrGetExistingOne();
        this.tryToPostNewRatingsOrGetExistingOne();
      }
    });

  }
  // ------------------------------------------------------------HERO----------------------------------------------------------------------
  public postHero(postData: Hero) {
    if (this.controllerActions.geAuthState().user && postData) {
      this.heroDBRefData
        .set(postData);
    }
  }


  public getHero(): void {
    if (this.controllerActions.geAuthState().user) {
      this.heroDBRefData
        .once('value', (snapshot) => {
          const leadedHero: Hero = snapshot.val();
          if (leadedHero) {
            this.controllerActions.HeroLoad(leadedHero);
            this.controllerActions.EnemyLoadNew(leadedHero.currentLevel);
          }
        });
    }
  }

  public tryToPostNewHeroOrGetExistingOne() {
    this.heroDBRefData
      .once('value', (snapshot) => {
        const leadedHero = snapshot.val();
        if (!leadedHero) {
          const newHero = new Hero(1);
          this.postHero(newHero);
          this.controllerActions.HeroLoad(newHero);
          //  this.controllerActions.EnemyLoadNew(1);
          return;
        }
        this.getHero();
      });
  }
  // ------------------------------------------------------------RATINGS----------------------------------------------------------------------
  public postRatings(postRatings: Ratings) {
    if (this.controllerActions.geAuthState().user && postRatings) {
      this.ratingsDBRefGeneralUserData.set(postRatings);
    }
  }

  public getRatings(): void {
    if (this.controllerActions.geAuthState().user) {
      this.ratingsDBRefGeneralUserData
        .once('value', (snapshot) => {
          const loadedRatings: Ratings = snapshot.val();
          if (loadedRatings) {
            this.controllerActions.ratingLoad(loadedRatings);
          }
        });
    }
  }

  public getAllRatings(): void {
    if (this.controllerActions.geAuthState().user) {
      const LastUpdateTime = new Date().valueOf() - (this.controllerActions.geRatingsState().lastGlobalRatingsUpdate ?? new Date('01/01/2010')).valueOf();
      if (LastUpdateTime > (15 * 60 * 1000)) {
        this.ratingsDBRefAllRatings
          .once('value', (snapshot) => {
            const ratings: Ratings[] = [];
            snapshot.forEach(item => {
              const rating = item.child('/ratings').val();
              ratings.push(rating);
            });
            this.controllerActions.ratingsGlobalLoad(ratings);
          });
      }
    }
  }

  public tryToPostNewRatingsOrGetExistingOne() {
    this.ratingsDBRefGeneralUserData
      .once('value', (snapshot) => {
        const loadedRatings = snapshot.val();
        if (!loadedRatings) {
          const newRatings = new Ratings();
          this.postRatings(newRatings);
          this.controllerActions.ratingLoad(newRatings);
          return;
        }
        this.getRatings();
      });
  }



  // EnemyRewardsFromDB
  public get EnemyRewardsFromDB() {
    return this.sharedDataService.getRefForEnemyRewards().on('value', (snapshot) => {
      const tempEnemyRewards = snapshot.val();
      if (tempEnemyRewards) {
        this.enemyRewards.next(tempEnemyRewards);
      }
    });
  }



  private postDataToRef(postDataRef: firebase.database.Reference, postData) {
    if (this.controllerActions.geAuthState().user && postData && postDataRef) {
      postDataRef
        .set(postData);
    }
  }
  private getRef(ref: string): firebase.database.Reference {
    return firebase
      .database()
      .ref(ref);
  }
  private get RefForUserData() {
    return 'userData/' + this.controllerActions.geAuthState().user.uid + '/';
  }
  private RefForDataTo(branch: string) {
    return this.RefForUserData + branch + '/';
  }

  private getRefForRatingsGeneral() {
    return DatabaseDataLinks.Ratings + '/';
  }

  private getRefForGeneralUserRating() {
    return this.getRefForRatingsGeneral() + this.controllerActions.geAuthState().user.uid + '/' + DatabaseDataLinks.Ratings;
  }




  //   private prepareHeroToPost(hero: Hero)
  // {

  // }

  // get
  /*
  public postHero(postData: Hero) {
    if (this.authService.user.value) {
      this.http.post(this.getUrlForUserData(), postData
      ).subscribe(responseData => {
        console.log(responseData);
      });
    }
  }

  public getHero(): Observable<Hero> {
    if (this.authService.user.value) {
      return this.http.get<Hero>(this.getUrlForUserData())
        .pipe(map(responseData => {
          console.log('return heroes;');
          const heroes: Hero[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              heroes.push(responseData[key]);
            }
          }
          return heroes[0];
        }));
    }
    return;
  }

  */
  // old one
  // private getUrlForUserData(): string {
  //   return this.urlFirebase + '/userData/hero/' + this.authService.user.value.uid + '.json';
  // }

  // private GetRefForData(): string {
  //   return 'userData/' + this.authService.user.getValue().uid + '/';
  // }
}
