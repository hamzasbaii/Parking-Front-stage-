import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(){
    this.userService.getUsers().subscribe(
      (users) => (this.users = users),
      (error) => console.log(error)
    );
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data);
        this.getUsers();
      },
      (error) => console.log(error)
    );
  }

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }

  createUser(){
    this.router.navigate(['create-user']);
  }
}
