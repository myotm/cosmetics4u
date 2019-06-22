import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcartcomponentComponent } from './shopcartcomponent.component';

describe('ShopcartcomponentComponent', () => {
  let component: ShopcartcomponentComponent;
  let fixture: ComponentFixture<ShopcartcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcartcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcartcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
