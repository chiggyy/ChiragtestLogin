import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService , private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot ,
    router: RouterStateSnapshot):
    boolean | UrlTree |
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree> {

      return this.authservice.user.pipe(take(1), map (user => {

        const auth = !!user;
        if (auth) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);

      })
       );
  }


}

