import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CsrfService } from './csrf.service';
import { BlogPostsService } from './blog-posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'product-list';
  displayname: null | string = "";
  isVisible = false;
  Visible = true;
  user: any;
  loggedIn: any;
  var1 = localStorage.getItem('fname');
  val = false;
  posts: any[] = [];

  constructor(
    private authService: AuthService,
    private csrfService: CsrfService,
    private blogPostsService: BlogPostsService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      this.isVisible = true;
      this.Visible = false;
    }

    const data = localStorage.getItem('fname');
    this.displayname = data;

    // Fetch CSRF token on initialization and set it in the CsrfService
    this.csrfService.fetchCsrfToken().subscribe(response => {
      this.csrfService.setToken(response.csrfToken);
    }, error => {
      console.error('Failed to fetch CSRF token', error);
    });

    this.authService.logoutEvent.subscribe(() => {
      location.reload();
    });

    this.authService.loginEvent.subscribe(() => {
      location.reload();
    });

    this.fetchPosts();
  }

  fetchPosts() {
    this.blogPostsService.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  onPostCreated() {
    this.fetchPosts(); // Refresh posts when a new post is created
  }

  logout() {
    this.authService.logout();
  }
}