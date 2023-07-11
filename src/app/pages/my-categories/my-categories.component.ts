import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService, CategoryWithUsersDto} from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.css']
})
export class MyCategoriesComponent {
  id: string = '';
  categories: any = [];
  success: boolean = false;

  constructor(private categoryService: CategoryService,
      private router: Router,
      private Router: ActivatedRoute) { }

     

  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      this.categoryService.getCategoryByUserId(this.id).subscribe(data => {
        this.categories = data;
        console.log(this.categories)
      },
        err => {
          console.log(err)
          })
  }
  )}
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
