import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DonationService, DonationDto } from 'src/app/services/donation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent {

  id: string = '';
  success: boolean = false;
  categories: any = [];

  constructor(private donationService: DonationService,
    private router: Router,
    private Router: ActivatedRoute,
    private categoryService: CategoryService
    ) { }

    form = new FormGroup({  
      amount: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });

  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
      },
        err => {
          console.log(err)
          })
  }

  )}
  get Amount() {
    return this.form.get('amount');
  }
  get Category() {
    return this.form.get('category');
  }

  async AddDonation(): Promise<void> {
    const donation: DonationDto = {
      donationAmount: +(this.Amount?.value ?? 0),
      categoryId: +(this.Category?.value ?? 0),
      donatorId: this.id
    };
    console.log(donation);
    this.donationService.addDonation(donation).subscribe(data => {
      console.log(data);
      this.router.navigate([`/my-donations/` + donation.donatorId]);
    })
  }

}
 