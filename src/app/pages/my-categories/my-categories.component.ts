import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService, CategoryWithUsersDto} from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.css']
})
export class MyCategoriesComponent {
  id: string = '';
  categories: any = [];
  success: boolean = false;
  totals: any = [];

  constructor(private categoryService: CategoryService,
      private router: Router,
      private Router: ActivatedRoute,
      private donationService : DonationService) { }

     

  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      this.categoryService.getCategoryByUserId(this.id).subscribe(data => {
        this.categories = data;
          this.id = String(params.get('id') ??'');
          this.categories.forEach((category: { id: number; }) => {
            this.donationService.getTotal(this.id, category.id).subscribe(total => {
              
              this.totals.push(total);
            }, error => {
              console.log(error);
            });
          });
        }, error => {
          console.log(error);
        });
      },
        err => {
          console.log(err)
      })
   
}
  Apply(id: string){
    this.router.navigate([`/apply-to-category/${id}`])
  }

  Remove(userId: string, id: number){
    let dto: CategoryWithUsersDto = {
      categoryId: id,
      userId: userId
    }
    this.categoryService.removeUserFromCategory(dto).subscribe((res: any) => {
      this.ngOnInit();
    },
    err => {
      console.log(err)
    })
  }

}
