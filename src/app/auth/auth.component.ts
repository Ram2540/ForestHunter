import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { RoutesService } from '../services/routes.service';
import * as fromAppStore from '../store/app-store';
import { Store } from '@ngrx/store';
import { ControllerActions } from '../store/controller/controller.actions';
import { DataStorageService } from '../services/data-storage/data-storage.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isUserLoginedIn = false;
  isFormOpened = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  openFormSignIn = false;
  private authStateSubscription: Subscription;



  constructor(
    private authService: AuthService,
    private routesService: RoutesService,
    private store: Store<fromAppStore.AppState>,
    private controllerActions: ControllerActions,
    private dataStorageService: DataStorageService) { }
  ngOnInit() {
    this.authStateSubscription = this.store.select('authState').subscribe(value => {
      this.isUserLoginedIn = value.isLoginedIn;
      return value;
  });
  }
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

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  onTest() {
  }

}
