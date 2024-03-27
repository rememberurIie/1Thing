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
  private static userDocument: UserDocument | null = null;

  
  constructor(private router: Router) {     
    this.auth?.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.getUserProfile();
            },
            whenSignedOut: user => {
              TopbarComponent.userDocument = null;
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

  toTop(){
    this.router.navigate(['feed']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public static getUserDocument(){
    return TopbarComponent.userDocument;
  }

  getUsername(){
    return TopbarComponent.userDocument?.username;
  }

  getUserProfile(){
    this.firestore.listenToDocument(
    {
      name: "Getting Document",
      path: [ "Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],
      onUpdate: (result) => {
        TopbarComponent.userDocument = <UserDocument>result.data();
        TopbarComponent.userDocument.userId = this.auth?.getAuth()?.currentUser?.uid || '{}'
      }
    })
  }
  
  toLogout(): void {
    this.auth.signOut();
    this.router.navigate(['']);
  }

  getProfile(){
    return TopbarComponent.userDocument?.username;
  }
}

export interface UserDocument {
  publicName: string;
  username: string;
  userId: string;
}
