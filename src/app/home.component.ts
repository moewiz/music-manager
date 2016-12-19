import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './authentication/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AuthenticationService]
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  error: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authenticationService.login(username, password)
      .subscribe((result: boolean) => {
        if (result) {
          // login successful
          this.router.navigate(['/songs']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
        }
      });
  }
}