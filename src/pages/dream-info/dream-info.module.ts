import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DreamInfoPage } from './dream-info';

@NgModule({
  declarations: [
    DreamInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DreamInfoPage),
  ],
})
export class DreamInfoPageModule {}
