import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Product, ShoppingCart } from '../../../models';
import { ProductApiService, ShoppingCartService } from '../../../services';
import { Observable, Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopcartcomponent',
  templateUrl: './shopcartcomponent.component.html',
  styleUrls: ['./shopcartcomponent.component.css']
})
export class ShopcartcomponentComponent implements OnInit, OnDestroy {

  //Shopping Cart Instances
  public products: Product[] = [];
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  public cartSubscription : Subscription;

  constructor(  private productApiService : ProductApiService, private shoppingcartService : ShoppingCartService) { }

  public emptyCart(){
    this.shoppingcartService.empty();
    
  }

  public ngOnDestroy() : void{
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  public ngOnInit() : void{
    this.productApiService.getallProducts().subscribe((result: any) => {
      for(var i = 0; i<result.data.length; i++){
        this.products.push(result.data[i]);
      }
    });
    this.cart = this.shoppingcartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p,n) => p+n, 0);
    });



  }

}
