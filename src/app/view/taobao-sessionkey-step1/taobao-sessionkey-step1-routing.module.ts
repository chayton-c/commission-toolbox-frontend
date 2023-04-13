import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaobaoSessionkeyStep1Component } from './taobao-sessionkey-step1.component';

const routes: Routes = [{ path: '', component: TaobaoSessionkeyStep1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoSessionkeyStep1RoutingModule { }
