import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Correct the property name to styleUrls
})

export class SignupComponent {

  firestore: FirebaseTSFirestore;
  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  constructor(router: Router) { 
    this.firestore = new FirebaseTSFirestore();
    this.firebasetsAuth = new FirebaseTSAuth();
    this.router = router; // Inject the router correctly
  }

  ToSubmitSignup(
    signupUsername: HTMLInputElement,
    signupEmail: HTMLInputElement,
    signupPassword: HTMLInputElement,
    signupConfirmPassword: HTMLInputElement
  ) {
    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;
  
    if (this.isAMatch(password, confirmPassword)) {

      this.firebasetsAuth.createAccountWith({
        email: email,
        password: password,

        onComplete: (authResult) => {

            const user = authResult.user;
            alert("Registered Successfully");

            if (user) {
            this.firestore.create({

                path: ["Users", user.uid],

                data: { 
                    username: username
                },

                onComplete: (docId) => {
                    alert("Profile Created");
                    signupUsername.value = "";
                    this.router.navigate(['']);
                },

                onFail: (err) => {
                    console.error("Firestore Error:", err);
                    alert(err);
                }

            });
            } else {
                console.error("User object is null.");
                alert("Failed to create profile. Please try again.");
            }
        },
        onFail: (err) => {
          console.error("Authentication Error:", err);
          alert("Failed to create profile. Please try again.");
        }
      });
      
    } else {
      alert("Passwords do not match.");
    }
  }
  
  
  
  
  isAMatch(text: string, comparedWith: string) {
    return text === comparedWith; // Use strict comparison
  }

  toLogin() {
    this.router.navigate(['']); // Adjust route as needed
  }
}
