import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaobaoSessionkeyStep3Component } from './taobao-sessionkey-step3.component';

const routes: Routes = [{ path: '', component: TaobaoSessionkeyStep3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoSessionkeyStep3RoutingModule { }
