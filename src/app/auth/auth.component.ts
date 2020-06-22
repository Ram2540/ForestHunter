import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { RoutesService } from '../services/routes.service';
import { SharedDataService } from '../databaseSharedData/shared-data.service';



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
  constructor(private authService: AuthService, private routesService: RoutesService, private sharedDataService: SharedDataService) { }

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

  onTest() {
    this.authService.onTest();
    this.sharedDataService.UpdateAllSharedData();
  }
}
