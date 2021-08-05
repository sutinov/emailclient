import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //modify or log the outgoing request

    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);
    // .pipe(
    //   filter((val) => val.type === HttpEventType.Sent),
    //   tap((val) => {
    //     // if (val.type === HttpEventType.Sent) {
    //     //   console.log('Request was sent to server');
    //     // }

    //     // if (val.type === HttpEventType.Response) {
    //     //   console.log('Got a response from API', val);
    //     // }
    //     console.log();
    //   })
    // );
  }
}
