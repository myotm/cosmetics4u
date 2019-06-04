import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNumeric } from 'rxjs/util/isNumeric';

@Injectable()
export class ValidatorService {

    constructor(){
    }


    public validatePasswordStrength(control: FormControl){
        const isValid = !control || !control.value ? false : control.value.length < 6 ? false : true;
        return isValid ? null : {
            validatePasswordStrength: {
                valid: false
            }
        };
    }

    public validatePasswordMatch(control: FormControl, password: string){
        const isValid = !control || !control.value ? false: password==undefined || !password ? true : control.value !== password ? false : true;
        
        return isValid ? null : {
            validatePasswordMatch: {
                valid: false
            }
        };
    }

    public validateDOB(control: FormControl){
        const today = new Date;
        const isValid = !control || !control.value ? false : control.value <= today;

        return isValid ? null : {
            validateDOB: {
                valid: false
            }
        };
    }

    public validatePhone(control: FormControl) {
        const isValid = !control || !control.value ? false : !isNumeric(control.value) ? false : true;

        return isValid ? null : {
            validatePhone: {
                valid: false
            }
        };
    }
}