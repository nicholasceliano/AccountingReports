import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIMiddlewareInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.indexOf(environment.apiEndpoint) > -1) {
			const apiReq = req.clone({
				headers: req.headers.set('APIKey', environment.apiKey)
			});

			return this.ResponseHandler(apiReq, next);
		} else {
			return this.ResponseHandler(req, next);
		}
	}

	private ResponseHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					return event;
				}
			}),
			// retry(1),
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `${error.url} - ${error.status}\nMessage: ${error.message}`;
				}
				return throwError(errorMessage);
			}));
	}
}
