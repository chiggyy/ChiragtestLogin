import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';

// tslint:disable-next-line: class-name
export interface authresposeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);

  private ExpirationTokenTimer: any;
  constructor(private http: HttpClient, private route: Router) { }


  signup(emails: string, passwords: string) {

    // tslint:disable-next-line: max-line-length
    return this.http.post<authresposeData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FireBaseKey,
        {

          email: emails,
          password: passwords,
          returnSecureToken: true

        }).pipe(catchError(this.errorHandler), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn );
        }));

    // .pipe(catchError(errResponse => {

    //   let ErrorMessage = 'An Unknown Error Occured';
    //   if (!errResponse.error || !errResponse.error.error) {
    //     return throwError(ErrorMessage);
    //   }
    //   switch (errResponse.error.error.message) {

    //     case 'EMAIL_EXISTS':
    //       ErrorMessage = 'This Email-id Already Exists';
    //   }
    //   return throwError(ErrorMessage);
    // })
    // );

  }


  login(emails: string, passwords: string) {

    // tslint:disable-next-line: max-line-length
    return this.http.post<authresposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FireBaseKey,
      {

        email: emails,
        password: passwords,
        returnSecureToken: true

      }).pipe(catchError(this.errorHandler), tap(resData => {

        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

      }));

  }

  logout() {
    this.user.next(null);
    this.route.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.ExpirationTokenTimer) {
      clearTimeout(this.ExpirationTokenTimer);
    }
    this.ExpirationTokenTimer = null;

  }


  autoLogout(expirationTimer: number) {

    this.ExpirationTokenTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer);

  }


  autoLogin() {
    const userdata: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userdata) {
      return;
    }
    const loadeduser = new UserModel(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpirationDate));
    if (loadeduser.Token) {
      this.user.next(loadeduser);
      const expiresin =
        new Date(userdata._tokenExpirationDate).getTime() -
        new Date().getTime();
    }
  }


  private handleAuthentication(email: string, id: string, token: string, expirestime: number) {

    const expirationDate = new Date(new Date().getTime() + +expirestime * 1000);
    const newuser = new UserModel(
      email,
      id,
      token,
      expirationDate

    );

    // console.log(newuser);
    this.user.next(newuser);
    this.autoLogout(expirestime * 1000);
    localStorage.setItem('userData', JSON.stringify(newuser));

  }





  private errorHandler(errResponse: HttpErrorResponse) {



    let ErrorMessage = 'An Unknown Error Occured';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(ErrorMessage);
    }
    switch (errResponse.error.error.message) {

      case 'EMAIL_EXISTS':
        ErrorMessage = 'This Email-id Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        ErrorMessage = 'Email-id not exists';
        break;
      case 'INVALID_PASSWORD':
        ErrorMessage = 'Password enter is Incorrect';
        break;
    }
    return throwError(ErrorMessage);



  }






}
