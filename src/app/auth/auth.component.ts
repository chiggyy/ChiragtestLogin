import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authresposeData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertboxComponent } from '../shared/alertbox/alertbox.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) alerthost: PlaceholderDirective;

  constructor(private authservice: AuthService,
              private route: Router,
              private componentfactoryresolver: ComponentFactoryResolver
  ) { }


  private closesub: Subscription;
  loginActive = true;
  isLoading = false;
  isError: string = null;

  ngOnInit(): void { }

  SwitchButton() {
    this.loginActive = !this.loginActive;
  }

  OnSubmit(form: NgForm) {
    // console.log(form.value);

    //  ...

    if (!form.valid) {
      return;
    }

    let authObs: Observable<authresposeData>;
    this.isLoading = true;
    if (this.loginActive) {

      authObs = this.authservice.login(form.value.email, form.value.password);
    } else {

      // tslint:disable-next-line: no-unused-expression
      authObs = this.authservice.signup(form.value.email, form.value.password);

    }


    authObs.subscribe(
      (resData) => {
        // console.log(resData);
        this.isLoading = false;

        this.route.navigate(['/profile']);

      },
      (ErrorMessage) => {
        // console.log(error);
        this.isLoading = false;
        // this.isError = ErrorMessage;
        this.ErrorMessages(ErrorMessage);



      }
    );

    form.reset();

  }



  OnErroHandler() {
    this.isError = null;
  }

  ngOnDestroy() {

    if (this.closesub) {
    this.closesub.unsubscribe();
    }
  }


  ErrorMessages(message: string) {

    const alertcompanyfactory = this.componentfactoryresolver.resolveComponentFactory(AlertboxComponent);

    const hostviewReference = this.alerthost.viewContainerRef;

    hostviewReference.clear();

    const componentRef = hostviewReference.createComponent(alertcompanyfactory);

    componentRef.instance.message = message;
    this.closesub = componentRef.instance.close.subscribe(() => {

      this.closesub.unsubscribe();
      hostviewReference.clear();


    });



  }
}
