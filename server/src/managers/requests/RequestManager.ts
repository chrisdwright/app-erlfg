import { App } from "../../app";
import { S2C } from "../../constants/Routes";
import { IdGenerator } from "../../generators/IdGenerator";
import { User } from "../user/User";
import { Request } from "./Request";

export class RequestManager {

  private app: App;

  public ids: IdGenerator = new IdGenerator();
  public requests: Request[] = [];

  constructor(app: App) {
    this.app = app;
  }

  public add(request: Request) {
    this.requests.push(request);

    this.app.users.sendPlatform({
      r: S2C.REQUEST_ADDED,
      d: request.getJSON()
    }, request.platform);
  }

  public remove(request: Request) {
    for (let i = 0; i < this.requests.length; i++)
      if (this.requests[i] == request)
        this.requests.splice(i, 1);

    this.app.users.sendPlatform({
      r: S2C.REQUEST_REMOVED,
      i: request.id
    }, request.platform);
  }

  public removeByRequester(user: User) {
    for (let i = 0; i < this.requests.length; i++)
      if (this.requests[i].requester == user)
        this.remove(this.requests[i]);
  }

  public sendList(user: User) {
    const list = [];
    for (let i = 0; i < this.requests.length; i++)
      if (this.requests[i].isPlatform(user.platform))
        list.push(this.requests[i].getJSON());

    user.send({
      r: S2C.REQUEST_LIST,
      l: list
    });
  }

  public getInvolvingUser(user: User) {
    for (let i = 0; i < this.requests.length; i++)
      if (this.requests[i].involvesUser(user))
        return this.requests[i];
    return null;
  }

}