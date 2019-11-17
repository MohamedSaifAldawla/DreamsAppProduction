import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LangPage } from './lang';

@NgModule({
  declarations: [
    LangPage,
  ],
  imports: [
    IonicPageModule.forChild(LangPage),
  ],
})
export class LangPageModule {}
