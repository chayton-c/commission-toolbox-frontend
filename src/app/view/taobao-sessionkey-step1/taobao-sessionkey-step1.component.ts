import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TaobaoSessionKey} from "../../pojo/authorization/taobao-session-key";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-taobao-sessionkey-step1',
  templateUrl: './taobao-sessionkey-step1.component.html',
  styleUrls: ['./taobao-sessionkey-step1.component.less']
})
export class TaobaoSessionkeyStep1Component implements OnInit {

  userId?: string;

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
  taobaoSessionKey: TaobaoSessionKey = new TaobaoSessionKey();

  ngOnInit(): void {
    const params = {
      userId: this.userId
    }
    this.http.post('api/external/taobaoSessionKey/init', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      if (res.taobaoSessionKey) {
        this.taobaoSessionKey = res.taobaoSessionKey
        this.nextStep();
        return;
      }
    });
    this.saveOrUpdateTaobaoSessionKeyFromHash();
  }


  nextStep():void {
    if (!this.taobaoSessionKey) {
      return;
    }

    if (!this.taobaoSessionKey.taobaoPid) {
      this.router.navigate(['/taobao-sessionkey-step2'], {
        queryParams: {
          taobaoSessionKeyId: this.taobaoSessionKey.id,
          userId: this.userId
        },
      });
      return;
    }

    this.router.navigate(['/taobao-sessionkey-step3'], {
      queryParams: {
        userId: this.userId
      },
    });

  }

  // 淘宝授权iframe相关
  taobaoSessionKeyFromTaobao: TaobaoSessionKey = new TaobaoSessionKey(); // 页面参数装载的TaobaoSessionKey
  taobaoSessionKeyAuthUrl?: SafeResourceUrl;
  hideTaobaoSessionKeyAuthIframe = true;
  // currentPage = window.location.href;
  @ViewChild('taobaoSessionKeyAuthIframe') taobaoSessionKeyAuth?: ElementRef;
  saveOrUpdateTaobaoSessionKeyFromHash(): void {
    const urlHashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = urlHashParams.get("refresh_token");
    if (accessToken) {
      this.taobaoSessionKeyFromTaobao.sessionKey = accessToken;

      let expiresIn = urlHashParams.get("expires_in");
      if (!expiresIn) expiresIn = '7776000';

      const expiresAt = new Date(new Date().getTime() + Number.parseInt(expiresIn) * 1000);
      this.taobaoSessionKeyFromTaobao.expiresAt = expiresAt;

      let taobaoOpenUid = urlHashParams.get("taobao_open_uid");
      if (!taobaoOpenUid) taobaoOpenUid = '';
      this.taobaoSessionKeyFromTaobao.taobaoOpenUid = taobaoOpenUid;

      let taobaoUserId = urlHashParams.get("taobao_user_id");
      if (!taobaoUserId) taobaoUserId = '';
      this.taobaoSessionKeyFromTaobao.taobaoUserId = taobaoUserId;

      let taobaoUserNick = urlHashParams.get("taobao_user_nick");
      if (!taobaoUserNick) taobaoUserNick = '';
      this.taobaoSessionKeyFromTaobao.taobaoUserNick = taobaoUserNick;
      this.saveOrUpdateTaobaoSessionKey();
    }
  }
  onIframeLoad(): void {
    // this.hideTaobaoSessionKeyAuthIframe = true;
    const currentUrl = this.taobaoSessionKeyAuth!.nativeElement.contentWindow.location.href;
    console.log(currentUrl);
    window.location.href = currentUrl;
    window.location.reload();
  }
  createAuthorization(): void {
    let currentPage = window.location.origin + "/taobao-sessionkey-step1?userId=" + this.userId;
    let page = 'https://oauth.taobao.com/authorize?response_type=token&client_id=33923804&view=web&redirect_uri=' + currentPage;
    // let testPage = window.location.href + "#access_token=6102b229445c99af36c346835767d71892fac147723a6f9869956194&token_type=Bearer&expires_in=7776000&refresh_token=6100c226a679e254d6125f61993e0916b1fa9904d034f0e869956194  (sessionKey)&re_expires_in=2592000&r1_expires_in=7776000&r2_expires_in=86400&taobao_open_uid=AAExrjsvAN_lnR371FmPHXEy&taobao_user_id=869956194&taobao_user_nick=zhi0008&w1_expires_in=7776000&w2_expires_in=300&state=&top_sign=882FBD73E132C399108B32DD738AA86B"
    this.taobaoSessionKeyAuthUrl = this.sanitizer.bypassSecurityTrustResourceUrl(page);
    this.hideTaobaoSessionKeyAuthIframe = false;
    this.cdr.detectChanges();
    console.log(this.taobaoSessionKeyAuth!)
    this.taobaoSessionKeyAuth!.nativeElement.addEventListener('load', this.onIframeLoad.bind(this));
  }
  updateAuthorization(): void {
    this.createAuthorization(); // 服务器是先通过taobaoUserId查询旧数据的，所以目前和create一样
  }
  saveOrUpdateTaobaoSessionKey(): void {
    const params = HttpUtils.transform(this.taobaoSessionKeyFromTaobao);
    params.userId = this.userId;
    console.log(106)
    console.log(params);

    this.http.post('api/external/taobaoSessionKey/saveOrUpdate', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.nextStep();
    });
  }


}
