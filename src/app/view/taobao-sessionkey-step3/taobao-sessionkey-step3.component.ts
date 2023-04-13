import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TaobaoSessionKey} from "../../pojo/authorization/taobao-session-key";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-taobao-sessionkey-step3',
  templateUrl: './taobao-sessionkey-step3.component.html',
  styleUrls: ['./taobao-sessionkey-step3.component.less']
})
export class TaobaoSessionkeyStep3Component implements OnInit {
  userId?: string;
  taobaoSessionKeyId?: string;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    // 获取roleId
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['userId']) this.userId = queryParams['userId'];
    });
  }

  ngOnInit(): void {
  }

  getTaobaoSessionKeyIdByUserId(): void {
    const params = {
      userId: this.userId
    }
    this.http.post('api/external/taobaoSessionKey/getIdByUserId', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.taobaoSessionKeyId = res.taobaoSessionKeyId;
    });
  }

}
