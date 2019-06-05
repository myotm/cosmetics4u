import {
  Component, ElementRef, EventEmitter, 
  Input, Output, ViewChild,
  OnInit, AfterViewInit
} from '@angular/core';
import { User } from '../../../models/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService, UserApiService, ValidatorService } from '../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Input() public user: User;

  @Output() public loginClick = new EventEmitter();

  public loginForm: FormGroup;

  constructor( private formBuidler: FormBuilder, private validatorService: ValidatorService ) {
    // this.user= {
    //   email: '',
    //   password: '',
    //   fullName: '',
    //   dob: '',
    //   city: '',
    //   country: ''
    // };
    this.user = new User();
   }

   public ngOnInit(){
    this.initLoginForm();
   }


   public initLoginForm(){
     this.loginForm = this.formBuidler.group({
      emailControl: ['', [Validators.required], [Validators.email]],
      passwordControl: ['', [Validators.required]]
     });
   }
  
   public onLoginclick(){
     console.log("Login has been clicked. Password is " + this.user.password);
     console.log(this.user.email + " has been logged in.");
   }


}
