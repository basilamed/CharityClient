import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, Pass } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation/confirmation.component';
import { CustomValidatorP } from '../register/password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  id: string = '';
  user: any = [];
  error: any = false;

  form = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), 
      CustomValidatorP.cannotContaintSpace, CustomValidatorP.number,CustomValidatorP.specialCaracter, CustomValidatorP.upperCase]),
    confirmPassword: new FormControl('', [Validators.required, CustomValidatorP.passwordMismatch]),
  })
  constructor(private router: ActivatedRoute, 
    public userService : UserService, 
    public dialog: MatDialog, public Router : Router) { }

    ngOnInit(): void {
      this.router.paramMap.subscribe(params => {
        this.id = String(params.get('id') ?? '');
        this.userService.getUserById(this.id).subscribe(data => {
          this.user = data;
        },
          err => {
            console.log(err)
            })
        
      })}


      async openConfirmationDialog(): Promise<void> {
        const dialogRef = this.dialog.open(ConfirmationComponent);
        try {
          const result = await dialogRef.afterClosed().toPromise();
          if (result) {
            await this.changePass();
            this.Router.navigate([`/`]);
          }
        } catch (error) {
          console.log(error);
        }
      }

      get oldPassword() {
        return this.form.get('oldPassword');
      }
      get newPassword() {
        return this.form.get('newPassword');
      }
      get confirmPassword() {
        return this.form.get('confirmPassword');
      }

      async changePass(): Promise<void> {
        try {
            const d: Pass = {

              oldPassword: this.oldPassword?.value ?? '',
              newPassword: this.newPassword?.value ?? '',
              confirmPassword: this.confirmPassword?.value ?? '',
            };
            console.log(d);
            await this.userService.changePassword(this.id, d).toPromise();
            this.Router.navigate([`/`]);
          }
          catch (error) {
          console.log(error);
          this.error = true;
        }
      }
      
}
