import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiHost = 'localhost';
const apiPort = '8000';
const apiBaseUrl = 'http://' + apiHost + ':' + apiPort + '/v1/cosmetics4u/api';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class HttpService<T> {
    constructor(private http: HttpClient) {    

    }

    public post(url: string, object: T) : Observable<T> {
        return this.http.post<T>(apiBaseUrl + url, object, httpOptions);
    }

    public postFile(url: string, object: T) : Observable<T>{
        return this.http.put<T>(apiBaseUrl + url, object, httpOptions);
    }

    public put(url: string, object: T) : Observable<T> {
        return this.http.put<T>(apiBaseUrl + url, object, httpOptions);
    }

    public get(url: string) : Observable<T> {
        return this.http.get<T>(apiBaseUrl + url, httpOptions);
    }

    public delete(url: string) : Observable<T> {
        return this.http.delete<T>(apiBaseUrl + url, httpOptions);
    } 

}


