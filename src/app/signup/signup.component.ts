import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  constructor() { 
      
      this.firebasetsAuth = new FirebaseTSAuth();
      this.router = new Router();
    
  }

  ToSubmitSignup(
    signupUsername: HTMLInputElement,
    signupEmail: HTMLInputElement,
    signupPassword: HTMLInputElement,
    signpConfirmPassword: HTMLInputElement
    )
    {
    let username = signupUsername.value;
    let email = signupEmail.value;
    let password = signupPassword.value;
    let comfirmpassword = signpConfirmPassword.value;

    if(
      this.isAMatch(password, comfirmpassword)
    ){
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Register Successfully");
            this.router.navigate([''])
          },
          onFail: (err) => {
            alert(err);
          }
        }
      );
    }
  }
  
  isAMatch(text:string, comparedWith: string){
    return text == comparedWith;
  }

  toLogin(){
    this.router.navigate(['']);
  }

}
