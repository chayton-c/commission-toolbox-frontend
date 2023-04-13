import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoSessionkeyStep3Component } from './taobao-sessionkey-step3.component';

describe('TaobaoSessionkeyStep3Component', () => {
  let component: TaobaoSessionkeyStep3Component;
  let fixture: ComponentFixture<TaobaoSessionkeyStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaobaoSessionkeyStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaobaoSessionkeyStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
