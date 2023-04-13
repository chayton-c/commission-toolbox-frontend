import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {WechatDatePipe} from "./pipe/wechat-date-pipe";

// #region third libs

const THIRDMODULES: Array<Type<void>> = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Array<Type<void>> = [];
const DIRECTIVES: Array<Type<void>> = [];

// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        WechatDatePipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        WechatDatePipe
    ]
})
export class SharedModule { }
