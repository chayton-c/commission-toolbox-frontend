import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoSessionkeyStep2RoutingModule } from './taobao-sessionkey-step2-routing.module';
import { TaobaoSessionkeyStep2Component } from './taobao-sessionkey-step2.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    TaobaoSessionkeyStep2Component
  ],
  imports: [
    CommonModule,
    TaobaoSessionkeyStep2RoutingModule,
    SharedModule
  ]
})
export class TaobaoSessionkeyStep2Module {
  taobaoPid?: string;
}
