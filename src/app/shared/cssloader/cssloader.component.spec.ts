import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssloaderComponent } from './cssloader.component';

describe('CssloaderComponent', () => {
  let component: CssloaderComponent;
  let fixture: ComponentFixture<CssloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
