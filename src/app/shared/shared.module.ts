import { NgModule } from '@angular/core';
import { CssloaderComponent } from './cssloader/cssloader.component';
import { AlertboxComponent } from './alertbox/alertbox.component';
import { PlaceholderDirective } from './placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CssloaderComponent,
    AlertboxComponent,
   PlaceholderDirective,

  ],
  imports: [CommonModule],
  exports: [
    CssloaderComponent,
    AlertboxComponent,
  PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule {

}
