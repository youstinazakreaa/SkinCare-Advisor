import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinanalysisComponent } from './skinanalysis.component';

describe('SkinanalysisComponent', () => {
  let component: SkinanalysisComponent;
  let fixture: ComponentFixture<SkinanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinanalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
