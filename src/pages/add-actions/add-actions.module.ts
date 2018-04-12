import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActionsPage } from './add-actions';

@NgModule({
  declarations: [
    AddActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActionsPage),
  ],
})
export class AddActionsPageModule {}
