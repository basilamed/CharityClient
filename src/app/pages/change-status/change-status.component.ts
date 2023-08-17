import { Component , OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  id : string  = "";
  user: any = [];
  success: boolean = false;

  constructor(private userService: UserService, 
    private Router : Router, 
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
    this.router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? "");
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data;
      },
        err => {
          console.log(err)
          })
      
    })

  }

  changeStatus(){
    this.userService.changeStatus(this.id).subscribe(data => {
      this.Router.navigate(['/'], { queryParams: { success: 'true' } });
    },
      err => {
        console.log(err)
      })
  }

}
