import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-recived-donations',
  templateUrl: './recived-donations.component.html',
  styleUrls: ['./recived-donations.component.css']
})
export class RecivedDonationsComponent {

  id: string = '';
  donations: any = [];
  success: boolean = false;

  constructor(private router: ActivatedRoute,
    private donationService: DonationService,
    private Router: Router,
    private userService : UserService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
    this.router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? '');
      this.userService.getDonationsByUserId(this.id).subscribe(data => {
        this.donations = data;
        console.log(this.donations)
      },
        err => {
          console.log(err)
      })
    },
      err => {
        console.log(err)
    })
  }

}
 