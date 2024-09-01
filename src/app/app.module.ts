import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { PostsComponent } from './posts/posts.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CsrfInterceptor } from './csrf.interceptor';  // Import CsrfInterceptor
import { MyhomeComponent } from './myhome/myhome.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    ReactiveFormComponent,
    SearchComponent,
    SearchResultsComponent,
    LoginComponent,
    SignupComponent,
    MyhomeComponent,
    ProfileComponent,
    CreatePostComponent,
    BlogPostsComponent
  ],
  imports: [
    SocialLoginModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot([
  
      { path: 'form', canActivate: [AuthGuard], component: ReactiveFormComponent },
      { path: 'search-results/:searchTerm', component: SearchResultsComponent },
      { path: 'search', canActivate: [AuthGuard], component: SearchComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'myhome', component: MyhomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', component: MyhomeComponent },
    ]),
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },  
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '20153140696-khqmo2d7kbkp9abb7gdisvf2hlgaoh6h.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }