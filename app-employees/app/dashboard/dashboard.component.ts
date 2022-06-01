import {
  getLocaleNumberSymbol
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  userInfo
} from 'os';
import {
  AuthService
} from '../auth.service';
import {
  DashboardService
} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nameCurrentAdmin="administrador";
  isToggle: boolean = true;

  constructor(
    private authService:AuthService,
    private dashboardService: DashboardService) {
    }

  ngOnInit(): void {
    this.authService.setCurrentUser();
    setTimeout(() => {
      this.getUserLocalStorage();
    }, 500);
  }

  getUserLocalStorage(){
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user') as any);
    this.nameCurrentAdmin= userFromLocalStorage.displayName;    
  }

  onSubmit() {
    this.dashboardService.signOut()
  }

  toggle() {
    this.isToggle = !this.isToggle;
  }
}
