import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const login = this.loginForm.value.login;
    const pwd = this.loginForm.value.password;

    this.userService.loginUser(login, pwd).subscribe(
      (user) => {
        // Login successful, navigate to the dashboard or any other page as needed
        this.router.navigate(['/Map']);
      },
      (error) => {
        // Handle error, display error message, or take appropriate action
        console.error('Login failed:', error);
      }
    );
  }
}
