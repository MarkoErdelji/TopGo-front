import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryInstanceComponent } from './history-instance.component';



@NgModule({
  declarations: [HistoryInstanceComponent],
  imports: [
    CommonModule
  ],
  exports:[HistoryInstanceComponent]
})
export class HistoryInstanceModule { }
