import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import AuthService
import { PostService } from '../post.service'; // Import PostService if needed

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  posts: any[] = [];
  

  constructor(
    private http: HttpClient,
    private authService: AuthService, // Inject AuthService
    private postService: PostService // Inject PostService if needed
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<any[]>('http://127.0.0.1:8000/getAll/').subscribe(
      data => {
        this.posts = data.map(post => ({
          ...post,
          title: post.nameb,   // Map nameb to title
          author: post.aname,  // Map aname to author
          content: post.blog   // Map blog to content
        }));
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  addComment(post: any, commentText: string) {
    if (commentText.trim()) {
      post.comments.push(commentText); // Add comment to local post data
      post.newComment = ''; // Clear the new comment input
      // Optionally, send comment to server if needed
      console.log('Comment added:', commentText);
    }
  }

  logout() {
    this.authService.logout(); // Use AuthService to handle logout
  }
}