import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../feed/feed.component';
import { FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


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

  constructor(){
  }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData!.creatorId],
        onComplete: result => {
            let userDocument = result.data();
            this.creatorName = userDocument!['publicName'];
            this.creatorUsername = userDocument!['username'];
        }
      }
    );
  }
  
}