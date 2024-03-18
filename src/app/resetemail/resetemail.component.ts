import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-resetemail',
  templateUrl: './resetemail.component.html',
  styleUrl: './resetemail.component.css'
})
export class ResetemailComponent {

  
  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  constructor() { 
      
      this.firebasetsAuth = new FirebaseTSAuth();
      this.router = new Router();
    
  }

  toLogin(){
    this.router.navigate(['']);
  }

  toResetSubmit(resetEmail: HTMLInputElement){
    let email = resetEmail.value;
    this.firebasetsAuth.sendPasswordResetEmail(
      {
        email: email,
        onComplete: (err) => {
          alert(`Reset Email sent to ${email}`)
          this.router.navigate(['']);
        }
      }
    )
  }

}
