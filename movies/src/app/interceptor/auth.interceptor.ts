import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSvc.authData$.pipe(
      switchMap((authData) => {
        if (!authData) return next.handle(request);

        let newRequest = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${authData.accessToken}`
          ),
        });
        return next.handle(newRequest);
      })
    );
  }
}
