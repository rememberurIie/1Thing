import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthModule } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    firebasetsAuth: FirebaseTSAuth;

    constructor(private router: Router) { 
        this.firebasetsAuth = new FirebaseTSAuth();
    }

    ngOnInit() {
        this.firebasetsAuth.getAuth().onAuthStateChanged(user => {
            if (user) {
                this.router.navigate(['feed']);
            }else{
                this.router.navigate(['']);
            }
        });
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
                    this.router.navigate(['feed']);
                },
                onFail: (err) => {
                    alert("Email and password not match!");
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
