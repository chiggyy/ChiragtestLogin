import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cssloader',
  // tslint:disable-next-line: max-line-length
  template: '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./cssloader.component.css']
})
export class CssloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
