import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { MyhomeComponent } from './myhome/myhome.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'search-results/:searchTerm',canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   {path:'myhome',component:MyhomeComponent},
  {path:'profile',component:ProfileComponent},
  { path: 'posts', component: PostsComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'posts', component: BlogPostsComponent },
  { path: 'blogs', component: BlogPostsComponent },
   { path: 'home', component: BlogPostsComponent },
  { path: 'form', component: CreatePostComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
