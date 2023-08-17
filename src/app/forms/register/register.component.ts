import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './email.validators';
import { CustomValidatorP } from './password.validators';
import { ageValidator } from './age.validators';
import { CityValidator } from './city.validators';
import { UserService , RegisterDto} from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  error: boolean = false;
  loading = false;

  constructor(private userService: UserService, private router: Router) { }

  form = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace]),
    city: new FormControl('', [Validators.required, CityValidator.City]),
    adress: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required, ageValidator.age]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace , CustomValidator.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), 
      CustomValidatorP.cannotContaintSpace, CustomValidatorP.number,CustomValidatorP.specialCaracter, CustomValidatorP.upperCase]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    status: new FormControl(''),
    selectedRole: new FormControl('')
  }, 
  {
    validators:CustomValidatorP.passwordMismatch
  })
  
get Fname() { 
  return this.form.get('fname');
}
get Lname() { 
  return this.form.get('lname');
}
get City() {
  return this.form.get('city');
}
get Adress() {
  return this.form.get('adress');
}
get Birthday() {
  return this.form.get('birthday');
}
  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }
  get ConfirmPassword(){
    return this.form.get('confirmPassword');
  }
  get Status(){
    return this.form.get('status');
  }
  register(){
    const datum = new Date(2005, 6, 15);
    const birthdayValue = this.Birthday?.value;
    const birthday = birthdayValue ? new Date(Date.parse(birthdayValue)) : datum;
    const statusValue = this.Status?.value;
    const status = statusValue ? (statusValue === 'true') : (statusValue === 'false' ? false : true);

    if(this.form.valid){
      const dto: RegisterDto = {
        firstName: this.Fname?.value ?? '',
        lastName: this.Lname?.value ?? '',
        userName: this.Email?.value ?? '',
        password: this.Password?.value ?? '',
        city: this.City?.value ?? '',
        address: this.Adress?.value ?? '',
        birthday: birthday,
        status: status,
        roleId: +(document.getElementById('role') as HTMLInputElement).value
      }
      console.log(dto);

      this.loading = true;
      this.userService.register(dto).subscribe((data: any) => {
        console.log('User registered successfully');
        if(dto.roleId === 4){
          this.router.navigate(['/login'] , { queryParams: { success2: 'true' } });
        }
        else{
          this.router.navigate(['/login'] , { queryParams: { success: 'true' } });
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error registering user:', error);
        this.error = true;
        this.loading = false;
      })
    }
  }
}


