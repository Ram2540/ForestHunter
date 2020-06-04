import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import {AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Hero } from '../classes/hero';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  userChanged: Observable<User> = this.user.asObservable();
  private api = 'AIzaSyDWyCa698JnaQrv1z1PjSIkErIhiLSAFPo';
  private localStorageUserKey = 'userData';
  private database = firebase.database();

  constructor(private http: HttpClient, private authFirebase: AngularFireAuth) {
    this.user.subscribe(user => {
      if (user) {
      localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
      }
    });

    this.authFirebase.authState.subscribe(user => {
      if (user){
        console.log('authFirebase.authState');
        console.log(user);
      }
    }
    );

  }

  onTest()
  {
    // console.log(firebase.database().ref('userData/'+ this.user.getValue().uid+'/'));
    // firebase.database().ref('userData/'+ this.user.getValue().uid+'/')
    // .once('value').then(function(snapshot) {
    //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //   console.log('username ');
    //   console.log(snapshot);
    // });

    console.log(firebase
        .database()
        .ref('userData/'+ this.user.getValue().uid+'/')
        .on('value', function(snapshot) {
          console.log(snapshot.val());
        }));
      // firebase
      //   .database()
      //   .ref('userData/' + 'userId')
      //   .set({
      //     username: 'name',
      //     email: 'email',
      //     profile_picture: 'imageUrl',
      //   });

  }
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.api,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

 


  login(email: string, password: string) {
    this.authFirebase.signInWithEmailAndPassword(email, password)
    .then(resData => {
      console.log(' ------------------------------------------55------------------------------=');
      console.log(resData);
      console.log(resData.user);
      // this.handleAuthentication(
      //   resData.user.email,
      //   resData.user.localId,
      //   resData.user.getIdToken().,
      //   +resData.user.expiresIn
      // );
    }).catch(this.handleError);



    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + this.api,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      uid: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    console.log(' ------------------------------------------------------------------------=');
    const loadedUser = new User(userData.email, userData.uid, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.user.complete();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


/*
 login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + this.api,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.api,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

*/



}
