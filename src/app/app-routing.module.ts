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

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent},
  { path: 'change-password/:id', component: ChangePasswordComponent},
  { path: 'approve', component: UsersToApproveComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'change-status/:id', component: ChangeStatusComponent, canActivate: [RoleGuard], data: {allowedRole: 3}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }