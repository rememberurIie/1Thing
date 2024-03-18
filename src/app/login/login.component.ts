import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrl: './login.component.css'
})

export class LoginComponent {

    firebasetsAuth: FirebaseTSAuth;
    private router: Router;

    constructor() { 
        
        this.firebasetsAuth = new FirebaseTSAuth();
        this.router = new Router();
      
    }

    toLoginSubmit(
        loginEmail: HTMLInputElement,
        loginPassword: HTMLInputElement
    ){
        let email = loginEmail.value;
        let password = loginPassword.value;

        this.firebasetsAuth.signInWith(
            {
                email: email,
                password: password,
                onComplete: (uc) => {
                    alert("Logged in")
                },
                onFail: (err) => {
                    alert(err);
                }
            }
        )
    }

    toSignup(){
        this.router.navigate(['signup']);
    }

    toReset(){
        this.router.navigate(['reset']);
    }

}