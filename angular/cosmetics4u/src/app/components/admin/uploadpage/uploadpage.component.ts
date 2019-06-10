import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, User } from '../../../models/user.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService, ValidatorService, UserApiService } from '../../../services';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  @Input() public product: Product;

  @Output() public uploadClick = new EventEmitter();
  
  public adminUploadForm : FormGroup;


  constructor( private formBuilder : FormBuilder, private validatorService: ValidatorService, 
    private authService: AuthService) { 
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
      prodImageControl: ['', [Validators.required]]
      
    })
  }

  public onUploadClick(){
    this.authService.upload(this.product).subscribe(product => {
      if(product) {
        this.uploadClick.emit();
      }
    }, err => {
        console.log('Error after onUPloadClick.');
    });
  }

  public onImageUploadClick(){
    


  }

}
