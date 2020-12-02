import { AddressInterface } from './../interfaces/address-interface';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import * as moment from 'moment';

// array in local storage for addresses
let addresses: AddressInterface[] = JSON.parse(localStorage.getItem('addresses')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log(`HttpRequest was intercepted ${url}`);
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>> {
            const regexp: RegExp = /\/api\/v2\/address\/\d+$/
            
            switch (true) {
                case url.endsWith('/api/v2/address') && method === 'GET':
                    return getAddresses();
                case url.endsWith('/api/v2/address') && method === 'POST':
                        return addAddress(request);
                case url.endsWith('/api/v2/address') && method === 'PUT':
                    return updateAddress(request);
                case regexp.test(url) && method === 'GET':
                    return getAddress();
                case regexp.test(url) && method === 'DELETE':
                    return deleteAddress();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getAddresses(): Observable<HttpResponse<any>> {
            return ok(addresses);
        }

        function deleteAddress(): Observable<HttpResponse<any>> {
addresses = addresses.filter((obj) => obj.id !== idFromUrl())
            
            localStorage.setItem('addresses', JSON.stringify(addresses));
            return ok({message: 'address was deleted'});
        }

        function getAddress(): Observable<HttpResponse<any>> {
          const address: AddressInterface = addresses.find((obj: AddressInterface) => obj.id === idFromUrl());
          return ok(address);
        }

        function addAddress(request: HttpRequest<any>): Observable<HttpResponse<any>> {
            const address: AddressInterface = request.body
            address.id = addresses.length + 1
            address.creationDate = moment()
            addresses.push(address)
            // Update local database
            localStorage.setItem('addresses', JSON.stringify(addresses))

            // Return an observable of the brand new event
            return ok(address)
        }

        function updateAddress(request: HttpRequest<any>): Observable<HttpResponse<any>> {
            const addressIndex: number = addresses.findIndex((obj: AddressInterface) => obj.id === request.body.id)
            addresses[addressIndex] = request.body
            // Update local database
            localStorage.setItem('addresses', JSON.stringify(addresses))
            return ok(request.body)
        } 
        // helper functions

        function ok(body?: any): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message): Observable<never> {
            return throwError({ error: { message } });
        }

        function unauthorized(): Observable<never> {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn(): boolean {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl(): number {
            const urlParts = url.split('/');
            return +urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};