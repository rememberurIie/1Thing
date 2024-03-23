import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Observable } from 'rxjs';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent{

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userDocument: UserDocument | null = null;

  
  constructor(private router: Router) {     
    this.auth?.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.getUserProfile();
            },
            whenSignedOut: user => {

            },
            whenSignedInAndEmailNotVerified: user => {
            },
            whenSignedInAndEmailVerified: user => {
            },
            whenChanged: user => {

            }
          }
        )
      }
    )
  }

  getUserProfile(){
    this.firestore.listenToDocument(
    {
      name: "Getting Document",
      path: [ "Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],
      onUpdate: (result) => {
        this.userDocument = <UserDocument>result.data();
      }
    })
  }
  
  toLogout(): void {
    this.auth.signOut();
    this.router.navigate(['']);
  }

  getProfile(){
    return this.userDocument?.username;
  }
}

export interface UserDocument {
  publicName: string;
  username: string;
}
