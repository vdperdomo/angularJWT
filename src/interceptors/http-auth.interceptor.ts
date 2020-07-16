import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,  private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers;
    if(this.authService.getJwtToken()) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      })
    }
    const req = request.clone({headers});
    return next.handle(req).pipe(
      map(res => {
          // we can modify the response
        if (res instanceof HttpResponse && res.headers.get('authorization')) {
          this.authService.setToken(res.headers.get('authorization'))
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return throwError( err );
      })
    );
  }
}
