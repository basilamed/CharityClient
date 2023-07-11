import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService , CategoryWithUsersDto} from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-to-category',
  templateUrl: './apply-to-category.component.html',
  styleUrls: ['./apply-to-category.component.css']
})
export class ApplyToCategoryComponent {

  id: string = '';
  categories: any = [];
  success: boolean = false;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private Router: ActivatedRoute) { }

    form = new FormGroup({  
      category: new FormControl('', [Validators.required])
    });

  ngOnInit(): void {
    this.Router.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
       this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ??'');
      this.categoryService.getPendingCategoryByUserId(this.id).subscribe(data => {
        this.categories = data;
        console.log(this.categories)
      },
        err => {
          console.log(err)
          })
  }
  )}
  get Category() {
    return this.form.get('category');
  }

  async Apply(): Promise<void> {
    const category: CategoryWithUsersDto = {
      categoryId: +(this.Category?.value ?? 0),
      userId: this.id
    };
    this.categoryService.addUserToCategory(category).subscribe(data => {
      console.log(data);
      this.router.navigate([`/my-categories/` + category.userId]);
    })
  }
  GoBack(): void {
    this.router.navigate([`/my-categories/` + this.id]);
  }
 
}
