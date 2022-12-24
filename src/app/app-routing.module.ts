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

const routes: Routes = [ {path: 'register', component: RegisterComponent},
                        { path: 'login', component: LoginComponent },
                        { path: 'login/forgotPassword', component:ForgotPasswordComponent},
                        { path: 'login/resetPassword',component:ResetPasswordComponent},
                        { path: 'unregistered', component: UnregisteredUserComponent},
                        { path: 'registered' , component: RegisteredUserComponent,canActivate: [UserGuard]},
                        { path: 'admin', component:AdminComponent,canActivate: [AdminGuard]},
                        { 
                          path: 'driver',
                          component: DriverComponent,
                          children: [
                            { path: 'inbox', component: DriverInboxComponent },
                            { path: 'profile', component: DriverProfileComponent },
                            { path: 'history', component: DriverHistoryComponent },
                            { path: 'reports', component:DriverReportsComponent}
                          ],canActivate: [DriverGuard]},
                          
                        { path: '', redirectTo: '**', pathMatch: 'full' },
                        { path: '**', component: UnregisteredUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
