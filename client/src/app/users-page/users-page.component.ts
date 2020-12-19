import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces';
import { UsersService } from '../shared/services/users.service'

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users$: Observable<User[]> | undefined
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.fetch()
  }
}