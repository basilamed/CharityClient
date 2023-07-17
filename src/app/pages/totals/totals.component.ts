import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { DonationService } from 'src/app/services/donation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {

  categories: any = [];
  totals: any = [];
  leftovers: any = [];
  usersCount: any = [];

  constructor(
    private categoryService: CategoryService,
    private donationService: DonationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);

      const observables: Observable<any[]>[] = this.categories.map((category: any) => {
        const totalAmount$ = this.donationService.getTotalByCategoryId(category.id);
        const leftoverAmount$ = this.donationService.getLeftoverByCategoryId(category.id);
        const usersCount$ = this.categoryService.getUserCountByCategoryId(category.id);
        return forkJoin([totalAmount$, leftoverAmount$, usersCount$]);
      });

      forkJoin(observables).subscribe((results: any[][][]) => {
        results.forEach((result: any[]) => {
          const [totalAmount, leftoverAmount, usersCount] = result;
          this.totals.push(totalAmount);
          this.leftovers.push(leftoverAmount);
          this.usersCount.push(usersCount);
        });

        console.log(this.totals);
        console.log(this.leftovers);
        console.log(this.usersCount);
      });
    });
  }
}


