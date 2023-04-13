import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoSessionkeyStep3RoutingModule } from './taobao-sessionkey-step3-routing.module';
import { TaobaoSessionkeyStep3Component } from './taobao-sessionkey-step3.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    TaobaoSessionkeyStep3Component
  ],
  imports: [
    CommonModule,
    TaobaoSessionkeyStep3RoutingModule,
    SharedModule
  ]
})
export class TaobaoSessionkeyStep3Module { }
