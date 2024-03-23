import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../feed/feed.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {
  @Input() postData: PostData | undefined;
  


  constructor(){
  }

  ngOnInit(): void {
      
  }
}