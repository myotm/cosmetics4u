import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, User } from '../../../models/user.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService, ValidatorService, UserApiService, ProductApiService } from '../../../services';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  @Input() public product: Product;

  @Output() public uploadClick = new EventEmitter();

  @Output() public ImageUploadClick = new EventEmitter();
  
  public adminUploadForm : FormGroup;


  constructor( private formBuilder : FormBuilder, private validatorService: ValidatorService, 
    private authService: AuthService, private productApiService: ProductApiService) { 
      this.product = new Product();
    }

  ngOnInit() {
    this.initUploadForm();
  }

  public initUploadForm(){
    this.adminUploadForm = this.formBuilder.group({
      prodIdControl: ['', [Validators.required]],
      prodNameControl: ['', [Validators.required]],
      prodTypeControl: ['', [Validators.required]],
      prodPriceControl: ['', [Validators.required, this.validatorService.validateNumber]],
      prodImageUrlControl: ['', [Validators.required]]
      
    });
  }

  public onUploadClick(){
    this.authService.upload(this.product).subscribe(product => {
      if(product) {
        this.uploadClick.emit();
        this.product.imageUrl;
      }
    }, err => {
        console.log('Error after onUPloadClick.');
    });
  }

  public onImageUploadClick() {
    // const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    // const file = fileUpload.files[0];
    // console.log(">>>>>FILE<<<<<< ", file);
    // this.productApiService.uploadImage(file).subscribe(file => {
    //   if(file) {
    //     console.log("got into if(file)--->><<");
    //     this.ImageUploadClick.emit();
    //   }
    // }, err => {
    //   console.log('Error After onImageUploadClick.');
    // }); 
  }

}
