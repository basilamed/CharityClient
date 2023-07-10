import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: boolean = false;
  loading: boolean = false;
  success = false;
  success2 = false;

  constructor(private userService: UserService, @Inject(Router) private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const success = params['success'];
      if (success === 'true') {
        this.success = true;
      }
      const success2 = params['success2'];
      if (success2 === 'true') {
        this.success2 = true;
      }
    });
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  login(){
    let formData = this.form.value;
    let credentials = {
      userName: formData.email,
      password: formData.password
    };
    this.loading = true;
    this.userService.login(credentials).subscribe((response: any) => {
      if(response && response.token){
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userService.setCurrentUser(response.user);
        this.router.navigate(['']);
        this.loading = false;
      }
    },
    (err) => {
      this.error = true;
      console.log(err);
      this.loading = false;
    }
    );
  }

}

