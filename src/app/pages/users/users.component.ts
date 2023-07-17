import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getApprovedUsers().subscribe((data: any) => {
      this.users = data;

    });
  }
  
  openInfo(id: number){
    this.router.navigate([`/user-details/${id}`])
  }

}
