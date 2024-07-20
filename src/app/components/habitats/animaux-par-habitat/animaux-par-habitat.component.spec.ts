import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimauxParHabitatComponent } from './animaux-par-habitat.component';

describe('AnimauxParHabitatComponent', () => {
  let component: AnimauxParHabitatComponent;
  let fixture: ComponentFixture<AnimauxParHabitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimauxParHabitatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimauxParHabitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
