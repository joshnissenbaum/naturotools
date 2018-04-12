import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispensaryPage } from './dispensary';

@NgModule({
  declarations: [
    DispensaryPage,
  ],
  imports: [
    IonicPageModule.forChild(DispensaryPage),
  ],
})
export class DispensaryPageModule {}
