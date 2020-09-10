import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements OnInit {

  constructor() { }

  @Input() message: string;
  // tslint:disable-next-line: no-output-native
  @Output() close =  new EventEmitter<void>();

  ngOnInit(): void {
  }

  Onclose() {

    this.close.emit();

  }

}
