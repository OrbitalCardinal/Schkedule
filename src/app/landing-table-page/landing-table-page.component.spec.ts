import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTablePageComponent } from './landing-table-page.component';

describe('LandingTablePageComponent', () => {
  let component: LandingTablePageComponent;
  let fixture: ComponentFixture<LandingTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
