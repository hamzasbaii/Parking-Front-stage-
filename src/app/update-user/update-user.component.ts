import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User = new User();
  roles: any[] = []; // Array to store roles retrieved from the backend
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );

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
    // Check if the login is already used, excluding the current user's login
    this.userService.checkLoginAvailability(this.user.login, this.user.id).subscribe(
      () => {
        // If the login is available, update the user
        this.userService.updateUser(this.user.id, this.user).subscribe(
          (result) => {
            // Handle success
            this.successMessage = 'User updated successfully.';
            this.errorMessage = ''; // Clear the error message
            setTimeout(() => {
              this.successMessage = ''; // Clear the success message after 5 seconds
            }, 5000);
          },
          (error) => {
            // Handle error
            this.errorMessage = 'Error updating user.';
            console.error('Error updating user:', error);
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
}
