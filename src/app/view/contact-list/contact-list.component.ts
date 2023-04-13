import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {TaobaoSessionKey} from "../../pojo/authorization/taobao-session-key";
import {HttpUtils} from "../../util/http/http-util";
import {WechatGroup} from "../../pojo/message/wechat-group";
import {WechatMessage} from "../../pojo/message/wechat-message";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {

  userId?: string;
  wechatGroups: WechatGroup[] = [];
  wechatMessages: WechatMessage[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    this.initContactList();
    // this.saveOrUpdateTaobaoSessionKeyFromHash();
  }

  initContactList():void {
    const params = {
    }
    this.http.post('api/external/wechatGroup/list', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;
      this.wechatGroups = res.wechatGroups;
    });
  }

  jump2Search(): void {
    this.router.navigate(['/search'], {
      queryParams: {
        userId: this.userId
      },
    });
  }

  jump2Message(wechatGroup: WechatGroup): void {
    this.router.navigate(['/m/' + wechatGroup.id], {
      queryParams: {
        userId: this.userId
      },
    })
  }

}
