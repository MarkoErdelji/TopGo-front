import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneySpentGraphComponent } from './money-spent-graph.component';

describe('MoneySpentGraphComponent', () => {
  let component: MoneySpentGraphComponent;
  let fixture: ComponentFixture<MoneySpentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneySpentGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneySpentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
