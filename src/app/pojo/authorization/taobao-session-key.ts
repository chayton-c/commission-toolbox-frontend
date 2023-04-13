export class TaobaoSessionKey {
  id: string;
  userId: string;
  taobaoOpenUid: string;
  taobaoUserId: string;
  taobaoPid: string;
  taobaoUserNick: string;
  sessionKey: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = "";
    this.userId = "";
    this.taobaoOpenUid = "";
    this.taobaoUserId = "";
    this.taobaoUserNick = "";
    this.sessionKey = "";
    this.taobaoPid = "";
    this.expiresAt = new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
