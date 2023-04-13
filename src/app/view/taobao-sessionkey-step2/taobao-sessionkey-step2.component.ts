import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {TaobaoSessionKey} from "../../pojo/authorization/taobao-session-key";

@Component({
  selector: 'app-taobao-sessionkey-step2',
  templateUrl: './taobao-sessionkey-step2.component.html',
  styleUrls: ['./taobao-sessionkey-step2.component.less']
})
export class TaobaoSessionkeyStep2Component implements OnInit {
  userId?: string;
  taobaoPid?: string;
  taobaoSessionKey: TaobaoSessionKey = new TaobaoSessionKey();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    // 获取roleId
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['userId']) this.userId = queryParams['userId'];
      if (queryParams['taobaoSessionKeyId']) this.taobaoSessionKey.id = queryParams['taobaoSessionKeyId'];
    });
  }

  ngOnInit(): void {
    const params = {
      userId: this.userId
    }
    this.http.post('api/external/taobaoSessionKey/init', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.taobaoSessionKey = res.taobaoSessionKey
      if (this.taobaoSessionKey.taobaoPid) {
        this.nextStep();
        return;
      }
    });
  }

  updateTaobaoPid(): void {
    const params = {
      id: this.taobaoSessionKey.id,
      taobaoPid: this.taobaoPid
    }
    this.http.post('api/external/taobaoSessionKey/updateTaobaoPid', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.nextStep();
    });
  }

  nextStep():void {
    this.router.navigate(['/taobao-sessionkey-step3'], {
      queryParams: {
        userId: this.userId
      },
    });
  }

}
