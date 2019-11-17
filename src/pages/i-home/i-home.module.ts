import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IHomePage } from './i-home';

@NgModule({
  declarations: [
    IHomePage,
  ],
  imports: [
    IonicPageModule.forChild(IHomePage),
  ],
})
export class IHomePageModule {}
