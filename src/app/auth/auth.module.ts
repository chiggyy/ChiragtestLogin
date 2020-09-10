import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild([
    {path: '', component: AuthComponent}
  ]),
CommonModule,
FormsModule,
SharedModule
]
})
export class AuthModule {

}
