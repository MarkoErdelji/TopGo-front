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
import {CreateDriverComponent} from "./modules/admin/components/create-driver/create-driver.component";
import {AdminHistoryComponent} from "./modules/admin/components/admin-history/admin-history.component";
import {AdminInboxComponent} from "./modules/admin/components/admin-inbox/admin-inbox.component";

const routes: Routes = [ {path: 'register', component: RegisterComponent},
                        { path: 'login', component: LoginComponent },
                        { path: 'login/forgotPassword', component:ForgotPasswordComponent},
                        { path: 'login/resetPassword',component:ResetPasswordComponent},
                        { path: 'unregistered', component: UnregisteredUserComponent},
                        { path: 'registered' , component: RegisteredUserComponent,canActivate: [UserGuard]},
                        { path: 'admin', component:AdminComponent,
                          children:[
                            {path: 'createDriver', component: CreateDriverComponent},
                            {path: 'history', component: AdminHistoryComponent},
                            {path: 'inbox', component: AdminInboxComponent}],
                          canActivate: [AdminGuard]},
                        { path: 'driver', component:DriverComponent,canActivate: [DriverGuard]},
                        { path: '', redirectTo: '**', pathMatch: 'full' },
                        { path: '**', component: UnregisteredUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
