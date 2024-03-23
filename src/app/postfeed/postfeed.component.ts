import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent {

  selectedImageFile: File | any = null;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  router = new Router();
  
  constructor() {
    
   }

  ngOnInit(){
  }

  onPostClick(commentInput: HTMLTextAreaElement) {

    let comment = commentInput.value;

    if(comment.length <= 0 ) return;

    if(this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
      this.uploadPost(comment);
    
    }
  }

  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
    {
      uploadName: "upload Image Post",
      path: ["Posts", postId, "image"],
      data: {
        data: this.selectedImageFile
      },
      onComplete: (downloadUrl) => {

        const currentUser = this.auth?.getAuth().currentUser
        if (currentUser){
          this.firestore.create(
          {
            path: ["Posts", postId],
            data: {
              comment: comment,
              creatorId: currentUser.uid,
              imageUrl: downloadUrl,
              timestamp: FirebaseTSApp.getFirestoreTimestamp()
            },
            onComplete: (docId) => {
              alert("upload text/photo success!");
              window.location.reload();
            },
            onFail: (err) => {
              alert(err);
            }
          });
        }
      },
      onFail: (err) => {
        alert(err);
      }
    });
  }
  
  uploadPost(comment: string){

    const currentUser = this.auth?.getAuth().currentUser
    if (currentUser){
      this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: currentUser.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          alert("upload text success!");
          window.location.reload();
        },
        onFail: (err) => {
          alert(err);
        }
      })
    };
  }










  onPhotoSelected(photoSelector: HTMLInputElement) {

    this.selectedImageFile = photoSelector.files![0];

    if(!this.selectedImageFile) return; 

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);

    fileReader.addEventListener(
      "loadend", 
      ev => {
        let readableString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
      
        if (readableString) {
          postPreviewImage.src = readableString;
        }
    });
  }

}
