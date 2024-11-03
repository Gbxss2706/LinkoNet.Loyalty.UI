import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { User } from '../../shared-modules/models/user-model';

@Component({
  selector: 'app-recent-users',
  templateUrl: './templates/recent-users.component.html',
  styleUrl: './styles/recent-users.component.scss'
})
export class RecentUsersComponent implements OnInit {

  public users: User[] = [];

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(usersResponse => {
      this.users = usersResponse;
    });
  }
}
