import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./view/login/login.module').then(m => m.LoginModule) },
  { path: 'taobao-sessionkey-step1', loadChildren: () => import('./view/taobao-sessionkey-step1/taobao-sessionkey-step1.module').then(m => m.TaobaoSessionkeyStep1Module) },
  { path: 'taobao-sessionkey-step2', loadChildren: () => import('./view/taobao-sessionkey-step2/taobao-sessionkey-step2.module').then(m => m.TaobaoSessionkeyStep2Module) },
  { path: 'taobao-sessionkey-step3', loadChildren: () => import('./view/taobao-sessionkey-step3/taobao-sessionkey-step3.module').then(m => m.TaobaoSessionkeyStep3Module) },
  { path: 'c/:userId', loadChildren: () => import('./view/contact-list/contact-list.module').then(m => m.ContactListModule) },
  { path: 'search', loadChildren: () => import('./view/search/search.module').then(m => m.SearchModule) },
  { path: 'search-result', loadChildren: () => import('./view/search-result/search-result.module').then(m => m.SearchResultModule) },
  { path: 'm/:messageGroupId', loadChildren: () => import('./view/message/message.module').then(m => m.MessageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
