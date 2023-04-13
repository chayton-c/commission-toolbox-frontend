export class WechatGroup {

  id: string;
  wxId: string;
  name: string;
  imgUrl: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = "";
    this.wxId = "";
    this.name = "";
    this.imgUrl = "";
    this.lastMessage = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }


}
