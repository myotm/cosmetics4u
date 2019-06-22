import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable, Observer } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs-compat';
import { CartItem, Product, ShoppingCart } from '../../models';
import { ProductApiService, StorageService, LocalStorageService } from '../../services';

const cart_key = "cart";

@Injectable()
export class ShoppingCartService{
    private storage: Storage;
    private subscriptionObservable : Observable<ShoppingCart>;
    private subscribers : Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
    private products: Product[] = [];
    
    public constructor(private storageService: StorageService, private productApiService : ProductApiService){     
        this.storage = this.storageService.get();
        this.productApiService.getallProducts().subscribe((result: any) => {
            for(var i = 0; i<result.data.length; i++){
              this.products.push(result.data[i]);
            }
        });
        this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
              this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
          });    
    }

    public get() : Observable<ShoppingCart>{
        return this.subscriptionObservable;
    }

    public addItem(product: Product, quantity: number): void {
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.product.id === product.id);
        if (item === undefined){
            item = new CartItem();
            item.product.id = product.id;
            cart.items.push(item);
        }
        item.quantity += quantity;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
        
        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);

    }

    public empty(): void{
        const newCart = new ShoppingCart();
        this.save(newCart);
        this.dispatch(newCart);

    }

    private calculateCart(cart: ShoppingCart): void {
        cart.totalItems = cart.items.map((item) => item.quantity * this.products.find((p) => p.id === item.product.id).price)
        .reduce((previous, current) => previous + current, 0);
    }

    private retrieve(): ShoppingCart {
        const cart = new ShoppingCart();
        const storedCart = this.storage.getItem(cart_key);
        if (storedCart) {
          cart.updateFrom(JSON.parse(storedCart));
        }
    
        return cart;
      }

    private save(cart: ShoppingCart): void {
    this.storage.setItem(cart_key, JSON.stringify(cart));
    }

    private dispatch(cart: ShoppingCart): void {
        this.subscribers
            .forEach((sub) => {
                try {
                sub.next(cart);
                } catch (e) {
                // we want all subscribers to get the update even if one errors.
                }
            });
    }


}



