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
<<<<<<< Updated upstream
=======
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { AdminAllDriversEarnGraphComponent } from './components/admin-graphs/admin-all-drivers-earn-graph/admin-all-drivers-earn-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminAllDriversRidesGraphComponent } from './components/admin-graphs/admin-all-drivers-rides-graph/admin-all-drivers-rides-graph.component';
import { AdminAllDriversKilometersGraphComponent } from './components/admin-graphs/admin-all-drivers-kilometers-graph/admin-all-drivers-kilometers-graph.component';
import { AdminSeperateUsersGraphComponent } from './components/admin-graphs/admin-seperate-users-graph/admin-seperate-users-graph.component';
import { AdminSeperateUsersEarnedGraphComponent } from './components/admin-graphs/admin-seperate-users-earned-graph/admin-seperate-users-earned-graph.component';
import { AdminSeperateUsersNumOfRidesGraphComponent } from './components/admin-graphs/admin-seperate-users-num-of-rides-graph/admin-seperate-users-num-of-rides-graph.component';
>>>>>>> Stashed changes



@NgModule({
<<<<<<< Updated upstream
  declarations: [AdminComponent, AdminMenuComponent, CreateDriverComponent, AdminHistoryComponent, AdminInboxComponent, RequestNotificationComponent, AdminUsersComponent, AdminNoteDialogComponent, AdminCreateNoteDialogComponent],
=======
  declarations: [AdminComponent, AdminMenuComponent, CreateDriverComponent, AdminHistoryComponent, AdminInboxComponent, RequestNotificationComponent, AdminUsersComponent, AdminNoteDialogComponent, AdminCreateNoteDialogComponent, AdminReportsComponent, AdminAllDriversEarnGraphComponent, AdminAllDriversRidesGraphComponent, AdminAllDriversKilometersGraphComponent, AdminSeperateUsersGraphComponent, AdminSeperateUsersEarnedGraphComponent, AdminSeperateUsersNumOfRidesGraphComponent],
>>>>>>> Stashed changes
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
