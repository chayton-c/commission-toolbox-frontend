import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaobaoSessionkeyStep2Component } from './taobao-sessionkey-step2.component';

const routes: Routes = [{ path: '', component: TaobaoSessionkeyStep2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoSessionkeyStep2RoutingModule { }
