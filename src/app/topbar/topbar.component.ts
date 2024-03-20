import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  constructor() {     
    this.firebasetsAuth = new FirebaseTSAuth();
    this.router = new Router();
  }
  
  toLogout(){
    this.firebasetsAuth.signOut();
    this.router.navigate(['']);
  }
}
