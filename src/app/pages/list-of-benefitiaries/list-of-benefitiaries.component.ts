import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-benefitiaries',
  templateUrl: './list-of-benefitiaries.component.html',
  styleUrls: ['./list-of-benefitiaries.component.css']
})
export class ListOfBenefitiariesComponent implements OnInit{

  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
      this.userService.getUsersWithCategories().subscribe((res: any) => {
        this.users = res;
        console.log(this.users)
      },
      err => {
        console.log(err)
      })
  }

  AddDonation(id: string, category: number){
    this.router.navigate([`/donate/${id}/${category}`]);
  }

}
