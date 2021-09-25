import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotesForLabelComponent } from './get-notes-for-label.component';

describe('GetNotesForLabelComponent', () => {
  let component: GetNotesForLabelComponent;
  let fixture: ComponentFixture<GetNotesForLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNotesForLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNotesForLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
