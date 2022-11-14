import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // sending http request to server
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      // listen
      .subscribe((postData) => {
        // no need to duplicate it since it's coming from the server
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]) // how to copy an array (so we can't edit incoming posts)
      });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content:string){
    const post: Post = {id: null, title: title, content: content};

    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
