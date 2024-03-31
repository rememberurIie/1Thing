import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../feed/feed.component';
import { FirebaseTSFirestore, OrderBy, Where} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { TopbarComponent } from '../topbar/topbar.component';
import { QuerySnapshot } from 'firebase/firestore';
import { reload } from 'firebase/auth';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {
  @Input() postData: PostData | undefined;
  creatorName: string | undefined;
  creatorUsername: string | undefined;
  firestore = new FirebaseTSFirestore();
  showReply: boolean = false;
  comments : Comment[] = [];
  commentCount: number = 0;

  likes : likeList[] = [];
  likeCount: number = 0;

  likeClicked = false;
  showDeleteButton = false;

  isFirestoreOperationInProgress = false;

  auth = new FirebaseTSAuth();

  constructor(private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getCreatorInfo();
    this.getComments();
    this.getLike();
    this.getLikeList();
    this.getDeleteButton();

  }

  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData!.creatorId],
        onComplete: result => {
            let userDocument = result.data();
            this.creatorUsername = userDocument!['username'];
        }
      }
    );
  }

  toggleReply() {
    this.showReply = !this.showReply;
  }


  //createcomment
  onSendClick(commentInput: HTMLInputElement){
    if(!(commentInput.value.length > 0)) return;
    this.firestore.create(
      {
        path: ["Posts", this.postData!.postId , "PostComments"],
        data: {
          comment: commentInput.value,
          creatorId: TopbarComponent.getUserDocument()?.userId,
          creatorUsername: TopbarComponent.getUserDocument()?.username,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          commentInput.value = "";
        },
        onFail:(err) => {
        },
      }
    );
  }


  getComments(){
    this.firestore.listenToCollection(
      {
        name: "Post Comments",
        path: ["Posts", this.postData!.postId, "PostComments"],
        where: [new OrderBy("timestamp", "asc")],
        onUpdate: (result) => {
          result.docChanges().forEach(
            PostCommentDoc => {
              if(PostCommentDoc.type == "added"){
                this.comments.unshift(<Comment>PostCommentDoc.doc.data())
                this.commentCount++;
              }
            }
          )
        }
      }
    );
  }

  getLikeList() {

    this.likes = [];

    this.firestore.getCollection({
        path: ["Posts", this.postData!.postId, "Likes"],
        where: [],
        onComplete: (result) => {
            result.docs.forEach(doc => {
              let likes = <likeList>doc.data();
              likes.likeId = doc.id;
              this.likes.push(likes);
              if (this.likes.find(like => like.creatorUserId === TopbarComponent.getUserDocument()?.userId)){
                this.likeClicked = true;
              }else{
                this.likeClicked = false;
              }
            }
          );
        },
      }
      
    );
  }


  onClickLike() {

    if (this.isFirestoreOperationInProgress) {
        return;
    }

    this.isFirestoreOperationInProgress = true;
    const likeToDelete = this.likes.find(like => like.creatorUserId === TopbarComponent.getUserDocument()?.userId);

    if (likeToDelete) {
        this.firestore.delete(
          {
            path: ["Posts", this.postData!.postId, "Likes", likeToDelete.likeId]
          }
        ).then(() => {
            this.isFirestoreOperationInProgress = false;
            this.likeClicked = false;
            this.getLikeList();
        })
        
    } else {
        this.firestore.create(
          {
            path: ["Posts", this.postData!.postId, "Likes"],
            data: {
                creatorUserId: TopbarComponent.getUserDocument()?.userId,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
            },
          }
        ).then(() => {
            this.isFirestoreOperationInProgress = false;
            this.likeClicked = true;
            this.getLikeList();
        })
    }
  }


  getLike() {
    this.firestore.listenToCollection(
      {
        name: "Post Likes",
        path: ["Posts", this.postData!.postId , "Likes"],
        where: [],
        onUpdate: (result) => {
          this.likeCount = result.size;
        }
      }
    )
  }

  getDeleteButton() {
    const checkDelete = this.postData!.creatorId === this.auth?.getAuth()?.currentUser?.uid;
    if (checkDelete === true) {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }
  

  ondeletePost(){
    const check = window.confirm("Do you want to delete post ?")
    if (check == true){
      this.firestore.delete({
        path: ["Posts", this.postData!.postId]
      ,
      }
      ).then(() => {
        window.location.reload();
      })
    } else {

    }
  } 
}

  


export interface Comment {
  creatorId: string;
  creatorUsername: string;
  comment: string
  timestamp: firebase.default.firestore.Timestamp;
  commentCount: number;
  likeCount: number;
}

export interface likeList {
  creatorUserId: string;
  likeId: string;
}