import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../classes/hero';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { DatabaseDataLinks } from './database-enums';
import { SharedDataService } from 'src/app/databaseSharedData/shared-data.service';
import { EnemyReward } from 'src/app/databaseSharedData/gold';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Ratings, RatingsDB } from '../../components/ratings/ratings.model';
import { ParseService } from '../parse.service';
import { UserDataInfo } from 'src/app/classes/userDataInfo';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // private urlFirebase = 'https://foresthunter-f42be.firebaseio.com/';
  public enemyRewards = new BehaviorSubject<EnemyReward[]>(null);
  private subscriptionToUser: Subscription;

  private get heroDBRefData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.Hero));
  }
  private get userDataInfoDBRefData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.UserDataInfo));
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
              private controllerActions: ControllerActions,
              private parseService: ParseService) {

    this.subscriptionToUser = this.store.select('authState').subscribe((authState) => {
      if (authState.user) {
        this.tryToPostNewUserDataInfoOrGetExistingOne();
          this.tryToPostNewHeroOrGetExistingOne();
          this.tryToPostNewRatingsOrGetExistingOne();
      }
    });

  }
  // ------------------------------------------------------------HERO----------------------------------------------------------------------
  public postUserDataInfo(postUserData: UserDataInfo) {
    //console.log('postUserData', postUserData);
    if (this.controllerActions.getAuthState().user && postUserData) {
      this.userDataInfoDBRefData
        .set(postUserData);
    }
  }

  public getUserDataInfo(): void {
    if (this.controllerActions.getAuthState().user) {
      this.userDataInfoDBRefData
        .once('value', (snapshot) => {
          const leadredUserDataInfo: UserDataInfo = snapshot.val();
          if (leadredUserDataInfo) {
            this.controllerActions.UserUserDataInfoLoad(leadredUserDataInfo);
          }
        });
    }
  }

  public tryToPostNewUserDataInfoOrGetExistingOne() {
    this.userDataInfoDBRefData
      .once('value', (snapshot) => {
        const leadredUserDataInfo = snapshot.val();
        if (!leadredUserDataInfo) {
          const newUserDataInfo = new UserDataInfo('user ' + this.controllerActions.getAuthState().user.uid.substring(0, 5));
          this.postUserDataInfo(newUserDataInfo);
          this.controllerActions.UserUserDataInfoLoad(newUserDataInfo);
          return;
        }
        this.getUserDataInfo();
      });
  }
  // ------------------------------------------------------------HERO----------------------------------------------------------------------
  public postHero(postData: Hero) {
    if (this.controllerActions.getAuthState().user && postData) {
      this.heroDBRefData
        .set(postData);
    }
  }


  public getHero(): void {
    if (this.controllerActions.getAuthState().user) {
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
    if (this.controllerActions.getAuthState().user && postRatings) {
      this.ratingsDBRefGeneralUserData.set(this.parseService.parseRatingsToDB(postRatings));
    }
  }

  public getRatings(): void {
    if (this.controllerActions.getAuthState().user) {
      this.ratingsDBRefGeneralUserData
        .once('value', (snapshot) => {
          const loadedRatings: Ratings = this.parseService.parseDBToRatings(snapshot.val());
          if (loadedRatings) {
            this.controllerActions.ratingLoad(loadedRatings);
          }
        });
    }
  }

  public getAllRatings(): void {
    if (this.controllerActions.getAuthState().user) {
      const LastUpdateTime = new Date().valueOf() - (this.controllerActions.getRatingsState().lastGlobalRatingsUpdate ?? new Date('01/01/2010')).valueOf();
      if (LastUpdateTime > (5 * 60 * 1000)) {
        this.ratingsDBRefAllRatings
          .once('value', (snapshot) => {
            const ratings: RatingsDB[] = [];
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


// -----------------------------------------------------------GENERAL-----------------------------------------------------------
  private postDataToRef(postDataRef: firebase.database.Reference, postData) {
    if (this.controllerActions.getAuthState().user && postData && postDataRef) {
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
    return 'userData/' + this.controllerActions.getAuthState().user.uid + '/';
  }
  private RefForDataTo(branch: string) {
    return this.RefForUserData + branch + '/';
  }

  private getRefForRatingsGeneral() {
    return DatabaseDataLinks.Ratings + '/';
  }

  private getRefForGeneralUserRating() {
    return this.getRefForRatingsGeneral() + this.controllerActions.getAuthState().user.uid + '/' + DatabaseDataLinks.Ratings;
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
