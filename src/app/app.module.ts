import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import  {MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmationComponent } from './confirmation/confirmation/confirmation.component';
import { UsersToApproveComponent } from './pages/users-to-approve/users-to-approve.component';
import { ChangeStatusComponent } from './pages/change-status/change-status.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ApplyToCategoryComponent } from './forms/apply-to-category/apply-to-category.component';
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { AddDonationComponent } from './forms/add-donation/add-donation.component';
import { MyDonationsComponent } from './pages/my-donations/my-donations.component';
import { DonationDetailsComponent } from './pages/donation-details/donation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    ConfirmationComponent,
    UsersToApproveComponent,
    ChangeStatusComponent,
    AddCategoryComponent,
    CategoriesComponent,
    ApplyToCategoryComponent,
    MyCategoriesComponent,
    AddDonationComponent,
    MyDonationsComponent,
    DonationDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
