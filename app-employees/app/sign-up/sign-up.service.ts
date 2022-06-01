import {
  Injectable,
  NgZone
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import {
  Router
} from '@angular/router';
import {
  resolveCname
} from 'dns';
import {
  ToastrService
} from 'ngx-toastr';
import {
  AuthService
} from '../auth.service';
import {
  Admin
} from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private currentUser: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private authService: AuthService
  ) {

  }

  signUp(email: string, password: string, adminData: Admin) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((resolve) => {
        resolve.user?.updateProfile({
          displayName: adminData.name
        })
        this.currentUser = resolve.user;
      }).
    then(() => {
        this.setAdminData(this.currentUser, adminData);
      })
      .then(() => {
        this.toastr.success('Usuario registrado exitosamente');
      }).
    then(() => {
        this.authService.setCurrentUser();
      })
      .then(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          })
        }, 1000);
      })
      .catch((err) => {
        this.toastr.error('Error al registrar usuario');
      })

  }

  setAdminData(adminResponse: any, adminData: Admin) {
    const userReference: AngularFirestoreDocument < any >= this.afs.doc(
      `admins/${adminResponse.uid}`
    );

    const adminRegistered: Admin = {
      uid: adminResponse.uid,
      name: adminData.name,
      surname: adminData.surname,
      numberId: adminData.numberId,
      displayName: adminData.name,
      photoURL: adminResponse.photoURL,
      email: adminResponse.email,
      emailVerified: adminResponse.emailVerified,

    }
    return userReference.set(adminRegistered, {
      merge: true,
    })
  }
}
