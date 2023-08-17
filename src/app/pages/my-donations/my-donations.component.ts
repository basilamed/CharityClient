import { Component } from '@angular/core';
import { DonationService, DonationQuery} from 'src/app/services/donation.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent {

  id: string = '';
  donations: any = [];
  success: boolean = false;
  filters!: DonationQuery;
  currentPage: number = 1;
  pageSize: number = 2; 
  totalItems!: number;

  constructor(private donationService: DonationService,
      private router: Router,
      private Router: ActivatedRoute) {
        this.filters = {
          leftoverAmount: 0,
          sortBy: '',
          isSortAscending: true,
          dateOfDonation: undefined,
          page: 1,
          pageSize: 2
        };
       }

     
  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      // this.donationService.getDonationsByDonatorId(this.id).subscribe(data => {
      //   this.donations = data;
      //   console.log(this.donations)
      // },
      //   err => {
      //     console.log(err)
      // })
      this.filters.pageSize = 2;
      this.loadDonations();
  }
  )}

  loadDonations() {
    this.filters.page = this.currentPage; 
    this.filters.pageSize = this.pageSize;

    this.donationService.getFilteredDonations(this.filters, this.id).subscribe((res: any) => {
      this.donations = res.items;
      this.totalItems = res.totalItems;
    }, err => {
      console.log(err);
    });
  }
  Add(){
    this.router.navigate([`/add-donation/${this.id}`])
  }
  onOrderByChange() {
    this.filters.sortBy = 'DonationAmount';
    this.loadDonations();
  }
  apply() {
    if (this.filters.dateOfDonation) {
      const periodOfDate = new Date(this.filters.dateOfDonation);
      this.filters.dateOfDonation = `${periodOfDate.getMonth() + 1}-${periodOfDate.getDate()}-${periodOfDate.getFullYear()}`;
      
    }
  
    this.loadDonations();
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.filters.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadDonations();
  }

}
