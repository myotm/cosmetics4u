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
         console.log("reached to loginclick>>>>>>>>>><<<<<<<<<<<<<<<");
        this.user = user;
         if (this.user.userRole === "admin"){
          this.loginClick.emit();
          this.router.navigate(['/uploadpage']);
         }
         else {
          console.log("User logs in >>>>>>><<<<<<<<<<<<");
          this.loginClick.emit();
          this.router.navigate(['/homepage']);
        }
         
         
       }
       else { }
     }, err => {
       console.log('Error after onLoginClick.');
     });
   }


}
