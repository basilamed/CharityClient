import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService, CategoryDto} from 'src/app/services/category.service';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation/confirmation.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  id: number = 0;

  constructor(
    private router: Router,
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private dialog : MatDialog
  ) {}

  form = new FormGroup({  
    name: new FormControl('', [Validators.required]),
  });

  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
          const category: CategoryDto = {
           name: (this.Name?.value ?? ''), 
         };
             this.categoryService.createCategory(category).subscribe(data => {
               console.log(data);
               this.router.navigate(['/categories']);
             })
           
        this.router.navigate([`/categories`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get Name() {
    return this.form.get('name');
  }

}
