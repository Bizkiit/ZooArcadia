import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZooservicesComponent } from './zooservices.component';

describe('ZooservicesComponent', () => {
  let component: ZooservicesComponent;
  let fixture: ComponentFixture<ZooservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZooservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZooservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
