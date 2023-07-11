import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService , CategoryDto, CategoryWithUsersDto} from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories: any = [];

  constructor(private categoryService: CategoryService,
     private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesWithUsers().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories)
    },
    err => {
      console.log(err)
    })
  }

  addCategory(){
    this.router.navigate(['/add-category']);
  }

}
