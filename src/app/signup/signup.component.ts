import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _route: Router, private _http: HttpClient) { }
  signup: FormGroup | any;

  ngOnInit(): void {
    this.signup = new FormGroup({
      'username': new FormControl('', Validators.required),
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  signupdata(signup: FormGroup) {
    this._http.post<any>("http://127.0.0.1:8000/signup/", this.signup.value)
      .subscribe(res => {
        alert('User created successfully');
        this.signup.reset();
        this._route.navigate(['/home']);  // Navigate to /home
      }, err => {
        console.error('Error during signup:', err);
        alert('Something went wrong');
      });
  }

  sbtn() {
    this._route.navigate(['/login']);  // Navigate to login page
  }
}