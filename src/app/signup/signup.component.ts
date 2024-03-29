import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Correct the property name to styleUrls
})

export class SignupComponent implements OnInit {

  firestore: FirebaseTSFirestore;
  firebasetsAuth: FirebaseTSAuth;
  private router: Router;

  users: userData [] = [];

  constructor(router: Router) { 
    this.firestore = new FirebaseTSFirestore();
    this.firebasetsAuth = new FirebaseTSAuth();
    this.router = router; // Inject the router correctly
  }
  ngOnInit(): void {
    this.getUserlists()
  }

  getUserlists(){
    this.firestore.getCollection(
      {
        path: ["Users"],
        where: [
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let user = <userData>doc.data();
              user.uid = doc.id;
              this.users.push(user);
              console.log(user.username)
            }
          )
        }
      }
    )
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

    if (this.users.some(user => user.username === username)) {
      alert("Username is already in use.");
    }

     else {
      if (this.isAMatch(password, confirmPassword)) {

        this.firebasetsAuth.createAccountWith({
          email: email,
          password: password,
  
          onComplete: (authResult) => {

            const user = authResult.user;

            if (user) {
            this.firestore.create({

              path: ["Users", user.uid],

              data: { 
                  username: username
              },

              onComplete: (docId) => {
                  alert("Registered Successfully");
                  signupUsername.value = "";
                  this.router.navigate(['']);
              },

              onFail: (err) => {
                  alert(err);
              }

            });
              } else {
                  alert("User object is null.");
              }
          },
          onFail: (err) => {
            alert(err);
          }
        });
        
      } else {
        alert("Passwords do not match.");
      }
    }
  }
    
  
  
  
  
  
  isAMatch(text: string, comparedWith: string) {
    return text === comparedWith; // Use strict comparison
  }

  toLogin() {
    this.router.navigate(['']); // Adjust route as needed
  }
}

export interface userData{
  uid: string;
  username: string;
}
