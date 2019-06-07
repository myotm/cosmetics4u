import {
  Component, ElementRef, EventEmitter, 
  Input, Output, ViewChild,
  OnInit, AfterViewInit
} from '@angular/core';
import { User } from '../../../models/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Input() public user: User;

  @Output() public loginClick = new EventEmitter();

  public loginForm: FormGroup;

  @Output() toggleAuthClick = new EventEmitter<boolean>();

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router : Router) {
    
    this.user = new User();
   }

   public ngOnInit(){
    this.initLoginForm();
   }


   public initLoginForm(){
     this.loginForm = this.formBuilder.group({
      emailControl: ['', [Validators.required, Validators.email]],
      passwordControl: ['', [Validators.required]]
     });
   }
  
   public onLoginclick(){
     this.authService.login(this.user.email, this.user.password).subscribe(user => {
       if (user){
         this.user = user;
         console.log("WELP~~~~");
         this.router.navigate(['/homepage']);
         this.loginClick.emit();
         
       }
     }, err => {
       console.log('Error after onLoginClick.');
     });
   }


}
