import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  roles: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onSubmit() {
    if (
      this.user.login &&
      this.user.pwd &&
      this.user.userName &&
      this.user.role &&
      this.user.role.id
    ) {
      // Check if the login is already used
      this.userService.checkLoginAvailability(this.user.login).subscribe(
        () => {
          // If the login is available, create the user
          this.userService.createUser(this.user).subscribe(
            (result) => {
              // Handle success
              console.log('User created:', result);
              this.successMessage = 'User created successfully.';
              this.errorMessage = ''; // Clear the error message
              this.user = new User(); // Reset the user object
              setTimeout(() => {
                this.successMessage = ''; // Clear the success message after 5 seconds
              }, 5000);
            },
            (error) => {
              // Handle error
              console.error('Error creating user:', error);
              this.errorMessage = 'An error occurred while creating the user. Please try again later.';
            }
          );
        },
        (error) => {
          // Handle error, the login is already used, show error message
          console.error('Login is already taken:', error);
          this.errorMessage = 'Login is already taken. Please try another one.';
        }
      );
    } else {
      this.errorMessage = 'Please enter all fields.';
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 5 seconds
      }, 5000);
    }
  }

  resetForm() {
    this.user = new User();
  }
}
