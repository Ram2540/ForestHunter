import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ControllerActions } from '../store/controller/controller.actions';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
    private controllerActions: ControllerActions) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = new Observable<User>((observer) => {
      observer.next(this.controllerActions.geAuthState().user);
      observer.complete();
    });
    return user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().set('auth', user.token)
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );
  }
}
