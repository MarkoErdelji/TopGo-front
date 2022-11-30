import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisteredUserComponent } from './components/registered-user/registered-user.component';
import { UnregisteredUserComponent } from './components/unregistered-user/unregistered-user.component';
import { UnregisteredUserModule } from './components/unregistered-user/unregistered-user.module';

const routes: Routes = [{ path: 'login', component: LoginComponent },
                        { path: 'unregistered', component: UnregisteredUserComponent},
                        { path: 'registered' , component: RegisteredUserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
