import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetoComponent } from './veto.component';

describe('VetoComponent', () => {
  let component: VetoComponent;
  let fixture: ComponentFixture<VetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
