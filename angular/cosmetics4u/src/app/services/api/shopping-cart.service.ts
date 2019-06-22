import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable, Observer } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs-compat';
import { CartItem, Product, ShoppingCart } from '../../models';
import { ProductApiService } from '../../services';

const cart_key = "cart";

@Injectable()
export class ShoppingCartService{
    constructor(private http: HttpService<any>){

    }





}



