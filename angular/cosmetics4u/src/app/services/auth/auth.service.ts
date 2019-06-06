import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../api/http.service';
import { ServerResponseCodes, User } from '../../models';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


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
        return this.http.post('/auth/signup', user).pipe(
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