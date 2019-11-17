import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DreamsPage } from './dreams';

@NgModule({
  declarations: [
    DreamsPage,
  ],
  imports: [
    IonicPageModule.forChild(DreamsPage),
  ],
})
export class DreamsPageModule {}
