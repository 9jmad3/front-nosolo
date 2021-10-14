import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebComponent } from './public-web.component';

describe('PublicWebComponent', () => {
  let component: PublicWebComponent;
  let fixture: ComponentFixture<PublicWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
