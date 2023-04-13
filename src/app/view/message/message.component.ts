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
  wechatGroupName?: string;

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
      this.wechatGroupName = res.wechatGroupName;
      for (let i = 0; i < this.wechatMessages.length; i++) {
        this.wechatMessages[i].createdAt = new Date(this.wechatMessages[i].createdAt);
        this.wechatMessages[i].showDate = true;
        if (i == 0) continue;
        let wechatMessage = this.wechatMessages[i];
        let previousWechatMessage = this.wechatMessages[i - 1];
        // wechatMessage.showDate = new Date(wechatMessage.createdAt).getTime() - new Date(previousWechatMessage.createdAt).getTime() > 60000 * 5;
        wechatMessage.showDate = wechatMessage.createdAt.getTime() - previousWechatMessage.createdAt.getTime() > 60000 * 5;
        console.log(wechatMessage.showDate)
      }
      this.cdr.detectChanges();
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
