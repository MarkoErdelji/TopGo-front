import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisteredUserComponent } from '../registered-user/registered-user.component';
import { UnregisteredUserComponent } from '../unregistered-user/unregistered-user.component';
import { UnregisteredUserModule } from '../unregistered-user/unregistered-user.module';
import { AdminComponent } from 'src/admin/admin.component';
import { DriverComponent } from 'src/driver/driver.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [ {path: 'register', component: RegisterComponent},
                        { path: 'login', component: LoginComponent },
                        { path: 'unregistered', component: UnregisteredUserComponent},
                        { path: 'registered' , component: RegisteredUserComponent},
                        { path: 'admin', component:AdminComponent},
                        { path: 'driver', component:DriverComponent},
                        { path: '', redirectTo: '**', pathMatch: 'full' },
                        { path: '**', component: UnregisteredUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
