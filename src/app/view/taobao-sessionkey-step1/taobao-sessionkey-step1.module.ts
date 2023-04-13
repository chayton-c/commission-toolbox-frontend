import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoSessionkeyStep1RoutingModule } from './taobao-sessionkey-step1-routing.module';
import { TaobaoSessionkeyStep1Component } from './taobao-sessionkey-step1.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    TaobaoSessionkeyStep1Component
  ],
  imports: [
    CommonModule,
    TaobaoSessionkeyStep1RoutingModule,
    SharedModule
  ]
})
export class TaobaoSessionkeyStep1Module { }
