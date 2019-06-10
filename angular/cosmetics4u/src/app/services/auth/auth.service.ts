import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../api/http.service';
import { ServerResponseCodes, User, Product } from '../../models';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

    constructor(private http: HttpService<any>){    }

    public login(email: string, password: string): Observable<any>{

        return this.http.post('/auth/login', { email: email, password: password }).pipe(
            map((result: any) => {
                if (result.status === ServerResponseCodes.SUCCESS) {
                    if(result.data){
                        return result.data;
                    }
                    return null;
                }
                return null;
            }), catchError(err=> Observable.throw(err))
        );
    }

    public logout(): void {
    }

    public signup(user: User): Observable<any>{
        console.log("auth.service.ts/signup clicked!_------------");

        return this.http.post('/user/create', user).pipe(
            map((result: any) => {
                if(result.status === ServerResponseCodes.SUCCESS){
                    if(result.data){
                        return result.data;
                    }
                    return null;
                }
                return null;
            }), catchError(err => Observable.throw(err))
        );
        
    }

    public upload(product: Product): Observable<any>{
        return this.http.post('/product/create', product).pipe(
            map((result: any) => {
                if(result.status === ServerResponseCodes.SUCCESS){
                    if(result.data){
                        return result.data;
                    }
                    return null;
                }
                return null;
            }), catchError(err => Observable.throw(err))
        );
    }


    
}