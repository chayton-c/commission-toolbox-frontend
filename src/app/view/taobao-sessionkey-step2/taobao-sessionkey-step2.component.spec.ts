import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoSessionkeyStep2Component } from './taobao-sessionkey-step2.component';

describe('TaobaoSessionkeyStep2Component', () => {
  let component: TaobaoSessionkeyStep2Component;
  let fixture: ComponentFixture<TaobaoSessionkeyStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaobaoSessionkeyStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaobaoSessionkeyStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
