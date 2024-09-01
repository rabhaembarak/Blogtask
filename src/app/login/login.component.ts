import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _route: Router, private _http: HttpClient) { }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  logindata(loginForm: FormGroup) {
    this._http.post<any>("http://127.0.0.1:8000/login/", this.loginForm.value)
      .subscribe(res => {
        alert('Login successful');
        this.loginForm.reset();
        this._route.navigate(['/home']);  // Navigate to /home
      }, err => {
        console.error('Error during login:', err);
        alert('Invalid credentials');
      });
  }

  sbtn1() {
    this._route.navigate(['/signup']);  // Navigate to signup page
  }
}