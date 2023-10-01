import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  roles: any[] = [];
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      pwd: ['', Validators.required],
      userName: ['', Validators.required],
      role: ['', Validators.required], // Initialize the role form control with an empty value
    });

    this.userService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
  
    const selectedRoleId: number = +this.signupForm.value.role;
    const selectedRole = this.roles.find((role) => role.id === selectedRoleId);
  
    if (!selectedRole) {
      console.error('Invalid role selected');
      return;
    }
  
    const newUser: User = {
      login: this.signupForm.value.login,
      pwd: this.signupForm.value.pwd,
      userName: this.signupForm.value.userName,
      role: selectedRole,
      vehicules: [],
      managedParkings: [],
      id: 0
    };
  
    // Check if the login is already used
    this.userService.checkLoginAvailability(this.signupForm.value.login).subscribe(
      (response) => {
        // If the login is available, create the user
        this.userService.signupUser(newUser).subscribe(
          (user) => {
            // Signup successful, navigate to the login page or any other page as needed
            this.router.navigate(['/login']);
          },
          (error) => {
            // Handle error, display error message, or take appropriate action
            console.error('Error creating user:', error);
          }
        );
      },
      (error) => {
        // Handle error, the login is already used, show error message
        console.error('Login is already taken:', error);
        this.errorMessage = 'Login is already taken. Please try another one.';
      }
    );
  }
  

  resetForm() {
    this.signupForm.reset();
  }
}
