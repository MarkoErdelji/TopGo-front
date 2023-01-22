import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInstanceComponent } from './history-instance.component';

describe('HistoryInstanceComponent', () => {
  let component: HistoryInstanceComponent;
  let fixture: ComponentFixture<HistoryInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryInstanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
