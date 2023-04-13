import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  tel?: string;
  verificationCode?: string;
  verificationCodeGetCountDownNumber = 0;
  verificationCodeGetCountDownInterval: any;
  errorMsg?: string;
  userId?: string;

  ngOnInit(): void {
  }

  sendVerificationCode(): void {
    if (!this.tel || this.tel.length != 11) {
      this.errorMsg = "请输入正确手机号码";
      return;
    }

    // this.loading = true;
    let params = {
      tel: this.tel,
    }
    this.verificationCodeGetCountDown();

    this.http.post('api/external/login/sendVerificationCode', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this.errorMsg = res.msg;
        return;
      }
      this.errorMsg = '';
    });
  }

  login(): void {
    if (!this.tel || this.tel.length != 11) {
      this.errorMsg = "请输入正确手机号码";
      return;
    }
    if (!this.verificationCode || this.verificationCode.length < 4) {
      this.errorMsg = "请输入正确的验证码";
      return;
    }

    // this.loading = true;
    let params = {
      tel: this.tel,
      verificationCode: this.verificationCode
    }

    this.http.post('api/external/login/loginByTel', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this.errorMsg = res.msg;
        return;
      }
      this.userId = res.user.id;
    });
  }

  verificationCodeGetCountDown(): void {
    this.verificationCodeGetCountDownNumber = 60;
    this.verificationCodeGetCountDownInterval = setInterval(() => {
      console.log(40)
      console.log(this.verificationCodeGetCountDownNumber);
      if (this.verificationCodeGetCountDownNumber == 0) {
        clearInterval(this.verificationCodeGetCountDownInterval)
        return;
      }
      this.verificationCodeGetCountDownNumber = this.verificationCodeGetCountDownNumber - 1;
    }, 1000);
  }
}
