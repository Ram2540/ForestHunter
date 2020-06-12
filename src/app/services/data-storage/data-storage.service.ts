import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../classes/hero';
import { AuthService } from 'src/app/auth/auth.service';
import { Weapon } from 'src/app/classes/weapon';
import { map } from 'rxjs/operators';
import { observable, Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { DatabaseDataLinks } from './database-enums';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private urlFirebase = 'https://foresthunter-f42be.firebaseio.com/';
  loadedHero = new BehaviorSubject<Hero>(null);
  private subscriptionToUser: Subscription;
  private get heroDBData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.Hero));
  }
  private get enemyLogDBData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.EnemyLog) + new Date().getTime().toString());
  }
  private get weaponLogDBData() {
    return this.getRef(this.RefForDataTo(DatabaseDataLinks.WeaponLog) + new Date().getTime().toString());
  }

  constructor(private http: HttpClient, private authService: AuthService) {
    this.subscriptionToUser = this.authService.userChanged.subscribe((value) => {
      if (this.authService.user.value) {
        this.getHero();
      }
    });
  }

  public postHero(postData: Hero) {
    if (this.authService.user.value && postData) {
      this.heroDBData
        .set(postData);
    }
  }

  public postEnemyLog(enemyPostData) {
    this.postDataToRef(this.enemyLogDBData, enemyPostData);
  }
  public postWeaponLog(weaponPostData) {
    this.postDataToRef(this.weaponLogDBData, weaponPostData);
  }



  public getHero(): void {
    if (this.authService.user.value) {
      this.heroDBData
        .on('value', (snapshot) => {
          const leadedHero = snapshot.val();
          if (leadedHero) {
            this.loadedHero.next(leadedHero);
          }
        });
    }
  }

  private postDataToRef(postDataRef: firebase.database.Reference, postData) {
    if (this.authService.user.value && postData && postDataRef) {
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
    return 'userData/' + this.authService.user.getValue().uid + '/';
  }
  private RefForDataTo(branch: string) {
    return this.RefForUserData + branch + '/';
  }

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
  //old one
  // private getUrlForUserData(): string {
  //   return this.urlFirebase + '/userData/hero/' + this.authService.user.value.uid + '.json';
  // }

  // private GetRefForData(): string {
  //   return 'userData/' + this.authService.user.getValue().uid + '/';
  // }
}
