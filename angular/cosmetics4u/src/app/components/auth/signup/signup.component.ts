import { Component, OnInit, Input, Output } from '@angular/core';
import { User, Auth } from '../../../models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ValidatorService, HttpService, UserApiService, AuthService} from '../../../services';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() public user: User;

  @Output() public signupClick = new EventEmitter();

  public signupForm :FormGroup;
  
  // @Output() public toggleAuthClick = new EventEmitter<boolean>();
  constructor( private formBuilder: FormBuilder, private validatorService: ValidatorService, private authService: AuthService ) { 
    this.user = new User();
  }



  ngOnInit() {
    this.initSignupForm();
  }

  public initSignupForm(){
    this.signupForm = this.formBuilder.group({
      emailControl: ['', [Validators.required, Validators.email]],
      passwordControl: ['', [Validators.required, (control: FormControl) => {
        const isValid = !control || !control.value ? false : control.value.length < 6 ? false : true;
        return isValid ? null : {
            validatePasswordStrength: {
                valid: false
            }
        };
      }]],

      retypePasswordControl: ['', [Validators.required, (control: FormControl) => {
        return this.validatorService.validatePasswordMatch(control, this.user.password);
      }]],
      userRoleControl: ['', [Validators.required]]
      
    });
    this.signupForm.controls.passwordControl.valueChanges.subscribe(() => {

      this.signupForm.controls.retypePasswordControl.updateValueAndValidity();
    });
  }

  public onSignupClick() {
    console.log("successful loginclick-------");
    this.authService.signup(this.user).subscribe(user => {
      if(user) {
        console.log('clicked');
        this.signupClick.emit('');
      }
    }, err => {
        console.log('Error after signupClick.');
      });
  }



}
