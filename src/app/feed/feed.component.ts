import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { PostComponent } from '../post/post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent {

  firestore = new FirebaseTSFirestore();
  firebasetsAuth: FirebaseTSAuth;

  posts: PostData [] = [];
  

  constructor(private router: Router) { 
      this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit() {
      this.firebasetsAuth.getAuth().onAuthStateChanged(user => {
          if (user) {
          }else{
              this.router.navigate(['']);
          }
      }
    );
    this.getPosts();
  }

  getPosts(){
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              post.postId = doc.id;
              this.posts.push(post);
            }
          );
        },
        onFail: err => {
        }
      }
    );
  }

}

export interface PostData {
  find(arg0: (like: any) => boolean): unknown;
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId : string;
}

