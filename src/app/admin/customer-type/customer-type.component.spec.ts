import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeComponent } from './customer-type.component';

describe('CustomerTypeComponent', () => {
  let component: CustomerTypeComponent;
  let fixture: ComponentFixture<CustomerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
