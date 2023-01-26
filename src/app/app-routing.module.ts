import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisteredUserComponent } from './modules/registered-user/registered-user.component';
import { UnregisteredUserComponent } from './modules/unregistered-user/unregistered-user.component';
import { UnregisteredUserModule } from './modules/unregistered-user/unregistered-user.module';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { DriverComponent } from 'src/app/modules/driver/driver.component';
import { RegisterComponent } from './components/register/register.component';
import { UserGuard } from './_guards/user.guard';
import { AdminGuard } from './_guards/admin.guard';
import { DriverGuard } from './_guards/driver.guard';
import { ForgotPasswordComponent } from './components/login/password-reset/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/login/password-reset/reset-password/reset-password.component';
import { DriverInboxComponent } from './modules/driver/components/driver-inbox/driver-inbox.component';
import { DriverProfileComponent } from './modules/driver/components/driver-profile/driver-profile.component';
import { DriverHistoryComponent } from './modules/driver/components/driver-history/driver-history.component';
import { DriverReportsComponent } from './modules/driver/components/driver-reports/driver-reports.component';
import { DriverProfileEditComponent } from './modules/driver/components/driver-profile/driver-profile-edit/driver-profile-edit.component';
import {CreateDriverComponent} from "./modules/admin/components/create-driver/create-driver.component";
import {AdminHistoryComponent} from "./modules/admin/components/admin-history/admin-history.component";
import {AdminInboxComponent} from "./modules/admin/components/admin-inbox/admin-inbox.component";
import {
  RegisteredProfileComponent
} from "./modules/registered-user/components/registered-profile/registered-profile.component";
import {RegisteredHomeComponent} from "./modules/registered-user/components/registered-home/registered-home.component";
import {
  RequestNotificationComponent
} from "./modules/admin/components/request-notification/request-notification.component";
import { AdminUsersComponent } from './modules/admin/components/admin-users/admin-users.component';
import {
  RegisteredInboxComponent
} from "./modules/registered-user/components/registered-inbox/registered-inbox.component";
import {DriverHomeComponent} from "./modules/driver/components/driver-home/driver-home.component";
import {
  RegisteredHistoryComponent
} from "./modules/registered-user/components/registered-history/registered-history.component";

const routes: Routes = [ {path: 'register', component: RegisterComponent},
                        { path: 'login', component: LoginComponent },
                        { path: 'login/forgotPassword', component:ForgotPasswordComponent},
                        { path: 'login/resetPassword',component:ResetPasswordComponent},
                        { path: 'unregistered', component: UnregisteredUserComponent},
                        { path: 'registered' ,
                          component: RegisteredUserComponent,
                          children:
                            [
                              { path: 'profile', component: RegisteredProfileComponent},
                              { path: 'home', component: RegisteredHomeComponent},
                              { path: 'inbox', component: RegisteredInboxComponent},
                              { path: 'history', component: RegisteredHistoryComponent},
                              { path: '', redirectTo: 'home', pathMatch: 'full' }
                            ],
                          canActivate: [UserGuard]},
                        {
                        path: 'driver',
                        component: DriverComponent,
                        children: [
                        { path: 'inbox', component: DriverInboxComponent },
                        { path: 'profile', component: DriverProfileComponent },
                        { path: 'profile/edit',component:DriverProfileEditComponent},
                        { path: 'history', component: DriverHistoryComponent },
                        { path: 'reports', component:DriverReportsComponent},
                          {path: 'home', component: DriverHomeComponent},
                          {path: '', redirectTo: 'home', pathMatch: 'full' }
                        ],canActivate: [DriverGuard]},
                        { path: '', redirectTo: 'unregistered', pathMatch: 'full' },
                        { path: 'admin', component:AdminComponent,
                          children:[
                            {path: 'users',component:AdminUsersComponent},
                            {path: 'createDriver', component: CreateDriverComponent},
                            {path: 'history/:id', component: AdminHistoryComponent},
                            {path: 'inbox', component: AdminInboxComponent},
                            {path: 'requests', component: RequestNotificationComponent}],
                          canActivate: [AdminGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
