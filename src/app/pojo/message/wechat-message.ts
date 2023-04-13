export class WechatMessage {

  // messageType
  public static readonly TYPE_TEXT = 1;
  public static readonly TYPE_IMAGE = 3;

  id: string;
  messageType: number;
  wechatGroupId: string;
  content: string;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = "";
    this.messageType = WechatMessage.TYPE_TEXT;
    this.wechatGroupId = "";
    this.content = "";
    this.imgUrl = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
