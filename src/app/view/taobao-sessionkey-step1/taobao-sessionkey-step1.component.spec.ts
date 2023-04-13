import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoSessionkeyStep1Component } from './taobao-sessionkey-step1.component';

describe('TaobaoSessionkeyStep1Component', () => {
  let component: TaobaoSessionkeyStep1Component;
  let fixture: ComponentFixture<TaobaoSessionkeyStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaobaoSessionkeyStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaobaoSessionkeyStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
