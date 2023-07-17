import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation/confirmation.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  id: string = '';
  userDetails: any = {};

  constructor(private userService: UserService,
     private router: Router, 
     private route: ActivatedRoute,
      public dialog: MatDialog) {}

  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.userDetails = data;
      console.log(this.userDetails);
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteUser();
      }
    });
  }

  deleteUser(){
    this.userService.deleteUser(this.id).subscribe((data: any) => {
      this.router.navigate(['/users']);
    });
  }

}