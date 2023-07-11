import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  user: any = [];
  public currentUserSubscription!: Subscription; // Promenjeno private u public
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(public userService:UserService, public router: Router,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
      this.userService.setCurrentUser(this.user);
      this.currentUserSubject.next(this.user);
    }

    this.currentUserSubscription = this.userService
    .getCurrentUser()
    .subscribe((user) => {
      this.user = user;
      this.cdr.detectChanges();
    });

  this.currentUserSubscription = this.userService
    .getCurrentUser()
    .subscribe((user) => {
      this.user = user;
      this.currentUserSubject.next(user);
      this.cdr.detectChanges();
    });
  }

  logout(){
    this.userService.logout();
  }
  openInfo(id: string){
    this.router.navigate([`/edit-profile/${id}`])
  }
  ChangePassword(id: string){
    this.router.navigate([`/change-password/${id}`])
  }
  ChangeVisibility(id: string){
    this.router.navigate([`/change-status/${id}`])
  }
  openCategories(id: string){
    this.router.navigate([`/my-categories/${id}`])
  }
  Donations(id: string){
    this.router.navigate([`/my-donations/${id}`])
  }
  Donate(id: string){
    this.router.navigate([`/add-donation/${id}`])
  }
  
}