import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../../models/user.model';
import { Observable, observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserApiService {
    constructor(private http: HttpService<any>){

    }

    public createUser(user: User): Observable<any>{
        return this.http.post('/user/create', user).pipe(map((result: any) => {
                return result;
        }), (err => Observable.throw(err)));
    }


    public updateUser(user: User): Observable<any> {
        return this.http.put('/users/', user).pipe(map((result: any) => {
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public removeUser(username: string): Observable<any> {
        return this.http.delete('/users/' + encodeURIComponent(username)).pipe(map((result: any)=> {
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public getAllUsers(): Observable<any> {
        return this.http.get('/users/').pipe(map((result: any) => {
            const data = result.data;
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public getUser(username: string): Observable<any> {
        return this.http.get('/users/' + encodeURIComponent(username)).pipe(map((result: any) => {
            const data = result.data;
            return result;
        }), catchError(err => Observable.throw(err)));
    }


}