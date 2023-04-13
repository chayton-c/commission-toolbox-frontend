import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WechatGroup} from "../../pojo/message/wechat-group";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {WechatMessage} from "../../pojo/message/wechat-message";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  userId?: string;
  wechatGroupId?: string;
  wechatMessages: WechatMessage[] = [];
  WechatMessage = WechatMessage;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['userId']) this.userId = queryParams['userId'];
    });

    this.activatedRoute.params.subscribe(params => {
      this.wechatGroupId = params['wechatGroupId'];
    });
  }

  ngOnInit(): void {
    this.initMessageList();
    // this.saveOrUpdateTaobaoSessionKeyFromHash();
  }

  initMessageList(): void {
    const params = {
      wechatGroupId: this.wechatGroupId
    }
    this.http.post('api/external/wechatMessage/list', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.wechatMessages = res.wechatMessages;
    });
  }

  jump2ContactList(): void {
    this.router.navigate(['/c/' + this.userId])
  }

  jump2Search(): void {
    this.router.navigate(['/search'], {
      queryParams: {
        userId: this.userId
      },
    });
  }
}
