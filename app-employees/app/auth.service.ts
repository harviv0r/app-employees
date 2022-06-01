import {
  Injectable,
  NgZone
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import {
  Router
} from '@angular/router';
import {
  userInfo
} from 'os';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.setCurrentUser();
  }



  setCurrentUser() {
    return this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user;

        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  get isLoggedIn(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('user') !);
    return (currentUser !== null && currentUser.uid !== false) ? true : false;
  }


}
