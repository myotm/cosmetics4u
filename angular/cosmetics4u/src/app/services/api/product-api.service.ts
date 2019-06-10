import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Product } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ProductApiService {
    constructor(private http: HttpService<any>){    }

    public createProduct(product: Product): Observable<any>{
        return this.http.post('/product/create', product).pipe(map((result: any) => {
                return result;
        }), (err => Observable.throw(err)));
    }

    public updateProduct(product: Product): Observable<any> {
        return this.http.put('/product/update', product).pipe(map((result: any) => {
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public removeProduct(product: string): Observable<any> {
        return this.http.delete('/product/remove' + encodeURIComponent(product)).pipe(map((result: any)=> {
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public getallProducts(): Observable<any> {
        return this.http.get('/products/').pipe(map((result: any) => {
            const data = result.data;
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public getProduct(product: string): Observable<any> {
        return this.http.get('/user/find' + encodeURIComponent(product)).pipe(map((result: any) => {
            const data = result.data;
            return result;
        }), catchError(err => Observable.throw(err)));
    }

    public uploadImage(){

        
    }




}


