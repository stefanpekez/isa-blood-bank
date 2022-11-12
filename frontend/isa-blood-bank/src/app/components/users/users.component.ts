import { Component, OnInit } from '@angular/core';
import { UserTable } from './shared/user-table.model';
import { User } from './shared/user.model';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers() {
    this.usersService.getAll().subscribe((response: User[]) => {
      this.users = response;
      console.log(response);
    });
  }

}
