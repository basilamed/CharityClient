import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DonationService, UserDonationDto } from 'src/app/services/donation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation/confirmation.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {

  userDetails: any = {}
  id: string = '';
  category: number = 0;
  user: any = [];
  categories: any = [];
  donations: any = [];
  selectedDonation: any = [];
  selectedAmount = 0;
  total:any = [];

  form = new FormGroup({  
    donationId: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(private router: ActivatedRoute,
    public UserService: UserService,
    public Router : Router,
    public DonationService: DonationService,
    private dialog : MatDialog 
   ) { }

   ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? '');
      this.category = Number(params.get('category') ?? 0);
      this.UserService.getUserById(this.id).subscribe(data => {
        this.userDetails = data;
        console.log(this.userDetails)
      },
        err => {
          console.log(err)
      })
      this.DonationService.getDonationsByCategoryId(this.category).subscribe(data => {
        this.donations = data;
        console.log(this.donations)
      },
        err => {
          console.log(err)
      })
      this.DonationService.getTotal(this.id, this.category).subscribe(data => {
        this.total = data;
        console.log(this.total)
      },
        err => {
          console.log(err)
      })
      
    })
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }}

    get DonationId() {
      return this.form.get('donationId');
    }
    get Amount() {
      return this.form.get('amount');
    }
    onSelectionChange(event: Event): void {
      const selectedValue: string = (event.target as HTMLSelectElement).value;
      this.selectedDonation = this.donations.find(
        (item: any) => item.donationId.toString() === selectedValue
      );
      this.selectedAmount = this.selectedDonation?.leftoverAmount || 0;
      this.updateValidator();
    }
    updateValidator(): void {
      const maxAmount = this.selectedDonation?.leftoverAmount || 0;
      this.form.get('amount')?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(maxAmount)
      ]);
      this.form.get('amount')?.updateValueAndValidity();
    }

    async openConfirmationDialog(): Promise<void> {
      const dialogRef = this.dialog.open(ConfirmationComponent);
      try {
        const result = await dialogRef.afterClosed().toPromise();
        if (result) {
          await this.Donate();
        }
      } catch (error) {
        console.log(error);
      }
    }
    async Donate(): Promise<void> {
      const dto: UserDonationDto = {
        donationId: +(this.DonationId?.value ?? 0),
        benefitiaryId: this.id,
        amount: +(this.Amount?.value ?? 0),
      };
      try {
        await this.DonationService.addUserDonation(dto).toPromise();
      } catch (error) {
        console.log(error);
      }
    }
    GoBack(): void {
      this.Router.navigate([`/list-of-benefitiaries`]);
    }
}
