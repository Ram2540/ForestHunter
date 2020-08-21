import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as fromAppStore from '../store/app-store';
import { Store } from '@ngrx/store';
import { ControllerActions } from '../store/controller/controller.actions';
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
  // user = new BehaviorSubject<User>(null);
  // userChanged: Observable<User> = this.user.asObservable();
  private api = 'AIzaSyDWyCa698JnaQrv1z1PjSIkErIhiLSAFPo';
  private localStorageUserKey = 'userData';
  private database = firebase.database();
  isLogined = false;

  constructor(private http: HttpClient,
              private authFirebase: AngularFireAuth,
              private store: Store<fromAppStore.AppState>,
              private controllerActions: ControllerActions) {


    this.authFirebase.user.subscribe(user => {
      if (user) {
        this.handleUserAssign(user);
      }
    });

    this.store.select('authState').subscribe(authState => {
      if (authState.user) {
        localStorage.setItem(this.localStorageUserKey, JSON.stringify(authState.user));
      }
    });
  }



  onTest() {
    // firebase
    //   .database()
    //   .ref('userData/' + this.controllerActions.geAuthState().user.uid + '/')
    //   .on('value', ((snapshot) => {
    //     console.log(snapshot.val());
    //   }));
    // const hero = new Hero(1);
    // firebase
    //   .database()
    //   .ref('ratings/test/')
    //   .set(hero);
  }
  signup(email: string, password: string): Promise<boolean | Observable<never>> {
    return this.authFirebase.createUserWithEmailAndPassword(email, password)
      .then(() => true)
      .catch(this.handleError);
  }

  login(email: string, password: string): Promise<boolean | Observable<never>> {
    return this.authFirebase.signInWithEmailAndPassword(email, password)
      .then(() => true)
      .catch(this.handleError);
  }

  autoLogin() {
    const userData: {
      email: string;
      uid: string;
      _idToken: string;
      _refreshToken: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.authFirebase.signInWithCustomToken(userData._idToken).catch(this.handleError);
  }

  logout() {
    // this.user.next(null);
    // this.authFirebase.signOut();
    // this.isLogined = true;
    this.controllerActions.UserLogout();
    localStorage.removeItem(this.localStorageUserKey);
  }

  private async handleUserAssign(
    user: firebase.User
  ) {
    const idToken = await firebase.auth().currentUser.getIdToken();
    const expirationDate = new Date(new Date().getTime() + 3600000);
    const loadedUser = new User(
      user.email,
      user.uid,
      idToken,
      user.refreshToken,
      expirationDate);

    this.controllerActions.UserLogin(loadedUser);
    this.isLogined = true;
  }


  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token ,'dfdfsdf', expirationDate);
  //   this.user.next(user);
  //   this.user.complete();
  // }


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

*/




