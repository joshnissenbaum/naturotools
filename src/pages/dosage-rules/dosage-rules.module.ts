import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosageRulesPage } from './dosage-rules';

@NgModule({
  declarations: [
    DosageRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(DosageRulesPage),
  ],
})
export class DosageRulesPageModule {}
