import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private csrfService: CsrfService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.csrfService.getToken();
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          'X-CSRFToken': token
        }
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}