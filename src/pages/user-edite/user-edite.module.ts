import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEditePage } from './user-edite';

@NgModule({
  declarations: [
    UserEditePage,
  ],
  imports: [
    IonicPageModule.forChild(UserEditePage),
  ],
})
export class UserEditePageModule {}
