import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { SquidexCMSConfig } from '../interfaces/squidexCMSConfig';
import { SquidexService } from '../services/squidex.service';

@Injectable()
export class SquidexAuthInterceptor implements HttpInterceptor {
    constructor(private squidexService: SquidexService, private squidexConfig: SquidexCMSConfig) { }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(this.squidexConfig.url)) {
            return next.handle(this.addToken(req)).pipe(
                catchError(e => {
                    if (e.status === 401) {
                        return this.squidexService.retrieveToken().pipe(
                            flatMap(() => next.handle(this.addToken(req)))
                        )
                    }
                    return throwError(e);
                })
            );
        }
        return next.handle(req);
    }
    private addToken(req: HttpRequest<any>): HttpRequest<any> {
        const token = this.squidexConfig.storageGetterFn().getItem(this.squidexConfig.storageKey);
        if (!token) {
            return req;
        }
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return clonedReq;
    }
}