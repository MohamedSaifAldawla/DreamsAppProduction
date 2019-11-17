import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ITabsPage } from './i-tabs';

@NgModule({
  declarations: [
    ITabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ITabsPage),
  ],
})
export class ITabsPageModule {}
