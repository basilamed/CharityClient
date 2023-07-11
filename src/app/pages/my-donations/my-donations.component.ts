import { Component } from '@angular/core';
import { DonationService, DonationDto } from 'src/app/services/donation.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent {
  id: string = '';
  donations: any = [];
  success: boolean = false;

  constructor(private donationService: DonationService,
      private router: Router,
      private Router: ActivatedRoute) { }

     
  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      this.donationService.getDonationsByDonatorId(this.id).subscribe(data => {
        this.donations = data;
        console.log(this.donations)
      },
        err => {
          console.log(err)
          })
  }
  )}
  Add(){
    this.router.navigate([`/add-donation/${this.id}`])
  }

  

}
