import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent {

  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  constructor() { 
        
    this.firebasetsAuth = new FirebaseTSAuth();
    this.router = new Router();

  }

}
