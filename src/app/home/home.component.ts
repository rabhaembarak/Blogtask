import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jsonData: any[] = [];
  LoggedIn: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    if (localStorage.getItem('fname') != null) {
      this.LoggedIn = true;
    }
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://127.0.0.1:8000/getAll').subscribe(data => {
      this.jsonData = data;
      this.jsonData.forEach(post => {
        post.comments = [];
        post.newComment = ''; 
      });
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  openCreatePostDialog(post?: any) {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '500px',
      disableClose: true,
      data: post ? { post } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'posted' || result === 'updated') {
        this.fetchData(); 
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  submitComment(postId: number) {
    console.log('Submitting comment for postId:', postId);

    if (!postId) {
      console.error('Post ID is undefined or null');
      return;
    }

    const post = this.jsonData.find(p => p.id === postId);

    if (post) {
      console.log('Post found:', post);
      console.log('New comment:', post.newComment);

      if (post.newComment && post.newComment.trim()) {
        post.comments.push({ text: post.newComment });

        this.http.post('http://127.0.0.1:8000/addComment', { postId, comment: post.newComment })
          .subscribe(response => {
            console.log('Comment submitted:', response);
            post.newComment = ''; 
          }, error => {
            console.error('Error submitting comment:', error);
          });
      } else {
        console.error('Comment is empty');
      }
    } else {
      console.error('No post found with the provided ID:', postId);
    }
  }

  editPost(post: any) {
    this.openCreatePostDialog(post);
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.http.delete(`http://127.0.0.1:8000/delete/${postId}`)
        .subscribe(() => {
          this.fetchData(); // Refresh the posts after deletion
        }, error => {
          console.error('Error deleting post:', error);
        });
    }
  }
}