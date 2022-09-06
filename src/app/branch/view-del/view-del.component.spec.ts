import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDelComponent } from './view-del.component';

describe('ViewDelComponent', () => {
  let component: ViewDelComponent;
  let fixture: ComponentFixture<ViewDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
