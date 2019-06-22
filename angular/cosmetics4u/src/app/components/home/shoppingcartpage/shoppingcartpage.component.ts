import { OnDestroy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product, ShoppingCart } from "../../../models";
import { ValidatorService, AuthService, ProductApiService, ShoppingCartService } from "../../../services";
import { Observable, Subscription } from "rxjs";


@Component({
  //
  selector: 'app-shoppingcartpage',
  templateUrl: './shoppingcartpage.component.html',
  styleUrls: ['./shoppingcartpage.component.css']
})
export class ShoppingcartpageComponent implements OnInit {
  public paymentDetailFormGroup: FormGroup;
  public addressDetailFormGroup: FormGroup;
  public contactDetailFormGroup: FormGroup;
  
  

  @Input() public product : Product;
  @Output() public Clicked = new EventEmitter();

  constructor(  private formBuilder: FormBuilder, private validatorService: ValidatorService,
    private authService: AuthService, private productApiService: ProductApiService, private shoppingCartService: ShoppingCartService ) {
      this.product= new Product();
     }
  
  

  ngOnInit() {
    this.initStepperFormGroup();
    
  }

  

  public initStepperFormGroup(){
    this.contactDetailFormGroup = this.formBuilder.group({  
      fullnameControl: ['', [Validators.required]]
    });
    this.addressDetailFormGroup = this.formBuilder.group({
      addressControl: ['', [Validators.required]]
    });
    this.paymentDetailFormGroup = this.formBuilder.group({  
      paymentNameControl: ['', [Validators.required]]
    });
  }

  public onClicked(){
    console.log("OnCLICKED is Clicked!");
  }

}
