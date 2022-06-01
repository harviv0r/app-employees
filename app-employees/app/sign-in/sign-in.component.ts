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
  AuthService
} from '../auth.service';
import {
  SignInService
} from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  singInForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private signInService: SignInService) {
    this.singInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    return this.signInService.signIn(this.singInForm.value['email'], this.singInForm.value['password'])
  }
}
