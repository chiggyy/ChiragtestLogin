import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptors } from './auth/auth-interceptors.service';

@NgModule({
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptors,
    multi: true

  }
  ]
})
export class CoreModule {

}
