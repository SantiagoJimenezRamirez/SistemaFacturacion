import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsSectionMenuComponent } from './buttons-section-menu.component';

describe('ButtonsSectionMenuComponent', () => {
  let component: ButtonsSectionMenuComponent;
  let fixture: ComponentFixture<ButtonsSectionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsSectionMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsSectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
