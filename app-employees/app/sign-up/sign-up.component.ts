import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  validateCallback
} from '@firebase/util';
import {
  windowWhen
} from 'rxjs';
import {
  AuthService
} from '../auth.service';
import {
  Admin
} from './admin.model';
import {
  SignUpService
} from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  adminData!: Admin;

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
  ) {

    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][A-z]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Z][A-z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      numberId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });

  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({
          mustMatch: true
        });
      } else {
        matchingControl.setErrors(null);
      }
    }

  }

  ngOnInit(): void {}

  onRegister() {
    this.adminData = this.signUpForm.value;
    this.signUpService.signUp(this.signUpForm.value['email'], this.signUpForm.value['password'], this.adminData);
  }

}
