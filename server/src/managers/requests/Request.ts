import { App } from "../../app";
import { RequestType } from "../../constants/CRequest";
import { PlatformType } from "../../constants/PlatformType";
import { User } from "../user/User";

export class Request {

  private app: App;

  public id: number;
  public timestamp: number;

  public type: RequestType;
  public platform: PlatformType;
  public markerId: number;
  public requester: User;

  constructor(app: App) {
    this.app = app;

    this.id = app.requests.ids.getNext();
    this.timestamp = Date.now();
  }

  public involvesUser(user: User) {
    if (this.requester == user) return true;
    // TODO: add other users involved
    return false;
  }

  public isPlatform(platform: PlatformType) {
    return this.platform == platform;
  }

  public getJSON() {
    return [this.id, this.markerId, this.type, this.timestamp, this.requester.displayName];
  }

}