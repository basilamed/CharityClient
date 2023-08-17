import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './role.guard';

import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { UsersToApproveComponent } from './pages/users-to-approve/users-to-approve.component';
import { ChangeStatusComponent } from './pages/change-status/change-status.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';
import { ApplyToCategoryComponent } from './forms/apply-to-category/apply-to-category.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { MyDonationsComponent } from './pages/my-donations/my-donations.component';
import { DonationDetailsComponent } from './pages/donation-details/donation-details.component';
import { AddDonationComponent } from './forms/add-donation/add-donation.component';
import { ListOfBenefitiariesComponent } from './pages/list-of-benefitiaries/list-of-benefitiaries.component';
import { DonateComponent } from './forms/donate/donate.component';
import { RecivedDonationsComponent } from './pages/recived-donations/recived-donations.component';
import { SendThankYouNoteComponent } from './forms/send-thank-you-note/send-thank-you-note.component';
import { RecivedNotesComponent } from './pages/recived-notes/recived-notes.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { TotalsComponent } from './pages/totals/totals.component';
import { SentNotesComponent } from './pages/sent-notes/sent-notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent},
  { path: 'change-password/:id', component: ChangePasswordComponent},
  { path: 'approve', component: UsersToApproveComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'change-status/:id', component: ChangeStatusComponent, canActivate: [RoleGuard], data: {allowedRole: 3}},
  { path: 'add-category', component: AddCategoryComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'apply-to-category/:id', component: ApplyToCategoryComponent, canActivate: [RoleGuard], data: {allowedRole: 4}},
  { path: 'categories', component: CategoriesComponent},
  { path: 'my-categories/:id', component: MyCategoriesComponent, canActivate: [RoleGuard], data: {allowedRole: 4}},
  { path: 'my-donations/:id', component: MyDonationsComponent, canActivate: [RoleGuard], data: {allowedRole: 3}},
  { path: 'donation-details/:id', component: DonationDetailsComponent},
  { path: 'add-donation/:id', component: AddDonationComponent, canActivate: [RoleGuard], data: {allowedRole: 3}},
  { path: 'list-of-benefitiaries', component: ListOfBenefitiariesComponent, canActivate: [RoleGuard], data: {allowedRole: 2}},
  { path: 'donate/:id/:category', component: DonateComponent, canActivate: [RoleGuard], data: {allowedRole: 2}},
  { path: 'recived-donations/:id', component: RecivedDonationsComponent, canActivate: [RoleGuard], data: {allowedRole: 4}},
  { path: 'send-thank-you-note/:id/:db_id/:d_id', component: SendThankYouNoteComponent, canActivate: [RoleGuard], data: {allowedRole: 4}},
  { path: 'recived-notes/:id', component: RecivedNotesComponent, canActivate: [RoleGuard], data: {allowedRole: 3}},
  { path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'user-details/:id', component: UserDetailsComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'totals', component: TotalsComponent, canActivate: [RoleGuard], data: {allowedRole: 2}},
  { path: 'sent-notes/:id', component: SentNotesComponent, canActivate: [RoleGuard], data: {allowedRole: 4}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }