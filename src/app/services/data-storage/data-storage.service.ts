import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../classes/hero';
import { AuthService } from 'src/app/auth/auth.service';
import { Weapon } from 'src/app/classes/weapon';
import {  map } from 'rxjs/operators';
import { observable, Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private urlFirebase = 'https://foresthunter-f42be.firebaseio.com/';
  //private API = "AIzaSyDWyCa698JnaQrv1z1PjSIkErIhiLSAFPo";
  hero: Hero = new Hero();

  constructor(private http: HttpClient, private authService: AuthService) { }

  public postHero(postData: Hero) {
    this.http.post(this.getUrlForUserData(), postData
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }



  public getHero(): Observable<Hero>{
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
  private getUrlForUserData() {
  return this.urlFirebase + '/userData/' + this.authService.user.value.id + '.json';
}
}
