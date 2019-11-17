import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterpretorProfilePage } from './interpretor-profile';

@NgModule({
  declarations: [
    InterpretorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(InterpretorProfilePage),
  ],
})
export class InterpretorProfilePageModule {}
