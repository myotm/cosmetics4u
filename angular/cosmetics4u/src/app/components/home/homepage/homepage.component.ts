import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService, ValidatorService, ProductApiService } from '../../../services';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Input() public products : Product[];
  @Output() public selectProductClick = new EventEmitter();
  @Output() public addToCartClick = new EventEmitter();

  public homePageForm : FormGroup;

  constructor( private formBuilder: FormBuilder, private validatorService: ValidatorService,
    private authService: AuthService, private productApiService: ProductApiService ) { 
      this.products = [];


    }

  ngOnInit() {
    this.initHomePageForm();
    this.loadAllProducts();
  }


  public initHomePageForm(){
    this.homePageForm = this.formBuilder.group({  });

    
    
  }

  public loadAllProducts(){
    console.log("Ping ping ping~~~~~~~~~~~");
    this.productApiService.getallProducts().subscribe((result: any) => {
      for(var i = 0; i<result.data.length; i++){
        this.products.push(result.data[i]);
      }

      });

    
  }




  public onSelectProductClick(){
    console.log("Select Product to view Details Clicked!-----");
    this.loadAllProducts();
  }

  public onAddtoCartClick(){
    console.log("Add to cart Button Clicked!-----");
  }

  
}
