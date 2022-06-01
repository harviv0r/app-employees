import {
  Injectable,
  NgZone
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  AuthService
} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {


  constructor(private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
    private toastr: ToastrService,
  ) {
    
    }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.toastr.success('Bienvenido!', '', {
          timeOut: 2000
        });
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          })
        }, 500);
      })
      .catch((err) => {
        this.toastr.error('La contraseña no es válida o el usuario no tiene contraseña');
      })
  }
}
