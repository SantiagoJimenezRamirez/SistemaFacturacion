import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneInputsComponent } from './zone-inputs.component';

describe('ZoneInputsComponent', () => {
  let component: ZoneInputsComponent;
  let fixture: ComponentFixture<ZoneInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
