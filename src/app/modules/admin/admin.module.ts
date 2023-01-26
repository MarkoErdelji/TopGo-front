import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { AdminHistoryComponent } from './components/admin-history/admin-history.component';
import { AdminInboxComponent } from './components/admin-inbox/admin-inbox.component';
import { RequestNotificationComponent } from './components/request-notification/request-notification.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminNoteDialogComponent } from './components/admin-note-dialog/admin-note-dialog.component';
import { AdminCreateNoteDialogComponent } from './components/admin-create-note-dialog/admin-create-note-dialog.component';
import { HistoryInstanceModule } from '../history-instance/history-instance.module';



@NgModule({
  declarations: [AdminComponent, AdminMenuComponent, CreateDriverComponent, AdminHistoryComponent, AdminInboxComponent, RequestNotificationComponent, AdminUsersComponent, AdminNoteDialogComponent, AdminCreateNoteDialogComponent],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    HistoryInstanceModule,
    CommonModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
