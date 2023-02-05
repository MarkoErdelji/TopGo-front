import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredUserComponent } from './registered-user.component';
import { RegisteredUserMenuComponent } from './components/registered-user-menu/registered-user-menu.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MapModule } from 'src/app/components/map/map.module';
import {RegisteredRouteFormComponent} from "./components/registered-route-form/registered-route-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisteredProfileComponent } from './components/registered-profile/registered-profile.component';
import { RegisteredHomeComponent } from './components/registered-home/registered-home.component';
import { RegisteredInboxComponent } from './components/registered-inbox/registered-inbox.component';
import { ChatDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/chat-dialog/chat-dialog.component';
import { NotificationDialogComponent } from './components/registered-dialogs/notification-dialog/notification-dialog.component';
import { EditProfileDialogComponent } from './components/registered-profile/registered-profile-dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { PanicDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/panic-dialog/panic-dialog.component';
import { FriendInviteDialogComponent } from './components/dialogs/friend-invite-dialog/friend-invite-dialog.component';

import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { RegisteredHistoryComponent } from './components/registered-history/registered-history.component';

import { FavouriteNameDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/favourite-name-dialog/favourite-name-dialog.component';
import { RegisteredReportsComponent } from './components/registered-reports/registered-reports.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { RideDayGraphComponent } from './components/graphs/ride-day-graph/ride-day-graph.component';
import { KmPerDayGraphComponent } from './components/graphs/km-per-day-graph/km-per-day-graph.component';
import { MoneySpentGraphComponent } from './components/graphs/money-spent-graph/money-spent-graph.component';
import { ReviewDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/review-dialog/review-dialog.component';
import { ChangePasswordDialogComponent } from './components/registered-profile/registered-profile-dialogs/change-password-dialog/change-password-dialog.component';





@NgModule({
    declarations: [
        RegisteredUserComponent,
        RegisteredUserMenuComponent,
        RegisteredRouteFormComponent,
        RegisteredProfileComponent,
        RegisteredHomeComponent,
        RegisteredInboxComponent,
        NotificationDialogComponent,
        ChatDialogComponent,
        EditProfileDialogComponent,
        PanicDialogComponent,
        FriendInviteDialogComponent,

        RegisteredHistoryComponent,
        FavouriteNameDialogComponent,


        FavouriteNameDialogComponent,
        RegisteredReportsComponent,
        RideDayGraphComponent,
        KmPerDayGraphComponent,
        MoneySpentGraphComponent,
        ReviewDialogComponent,
        ChangePasswordDialogComponent

    ],

  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MapModule,
    ReactiveFormsModule,
    NavbarModule,
    CommonModule,
    ReactiveFormsModule,
    NgxChartsModule

  ],
  exports: [
    RegisteredUserComponent
  ]
})
export class RegisteredUserModule { }
