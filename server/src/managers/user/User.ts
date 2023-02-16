import { v4 as uuid } from "uuid";
import WebSocket from "ws";
import { App } from "../../app";
import { PlatformType } from "../../constants/PlatformType";
import { C2S, S2C } from "../../constants/Routes";
import { NameGenerator } from "../../generators/NameGenerator";
import { Utils } from "../../utils/Utils";
import { UserRecord } from "../database/UserRecord";
import { Request } from "../requests/Request";

export class User {

  private app: App;
  private ws: WebSocket;
  private onCloseBound: any;
  private onMessageBound: any;

  public record: UserRecord;
  public id: string;
  public displayName: string;
  public platform: PlatformType;

  constructor(app: App, ws: WebSocket) {
    this.app = app;
    this.ws = ws;
    this.id = uuid();
    this.displayName = NameGenerator.getName();

    this.onCloseBound = this.onClose.bind(this);
    this.onMessageBound = this.onMessage.bind(this);
    this.addEventListeners();
  }

  public addEventListeners() {
    this.ws.on("close", this.onCloseBound);
    this.ws.on("message", this.onMessageBound);
  }

  public removeEventListeners() {
    this.ws.off("close", this.onCloseBound);
    this.ws.off("message", this.onMessageBound);
  }

  public onClose() {
    if (this.record) console.log(`User Disconnect: ${this.record._id}`);
    else console.log(`Guest Disconnect: ${this.id}`);
    this.removeEventListeners();

    this.app.requests.removeByRequester(this);
    this.app.users.remove(this);
  }

  public send(data: any) {
    this.ws.send(JSON.stringify(data));
  }

  public onMessage(message: any) {
    var m = JSON.parse(message);
    Utils.logMessage(this.id, m);

    switch (m.r) {
      case C2S.NETWORK_SIGN_IN: this.signIn(m); break;
      case C2S.NETWORK_SELECT_PLATFORM: this.selectPlatform(m); break;

      case C2S.REQUEST_CREATE_NEW: this.request_createNew(m); break;
    }
  }

  private signIn(message: any) {
    var accountType = message.t;
    var platformType = message.p;

    if (isNaN(accountType) || accountType < 0 || accountType > 6) return;
    if (isNaN(platformType) || platformType < 0 || platformType > 2) return;

    this.platform = platformType;
    this.send({
      r: S2C.NETWORK_SIGNED_IN,
      p: this.platform
    });
  }

  private selectPlatform(message: any) {
    var platformType = message.p;

    // validate input
    if (isNaN(platformType) || platformType < 0 || platformType > 2) return;

    // check and cancel any active requests
    this.app.requests.removeByRequester(this);

    // change platform & send new request list
    this.platform = platformType;
    this.send({
      r: S2C.NETWORK_CHANGED_PLATFORM,
      p: this.platform
    });
    this.app.requests.sendList(this);
  }

  private request_createNew(message: any) {
    const markerId = message.i;
    const activityType = message.t;

    // TODO: validate client input

    // make sure user doesn't have an active request
    const existingRequest = this.app.requests.getInvolvingUser(this);
    if (existingRequest) return;

    // create request
    const newRequest = new Request(this.app);
    newRequest.type = activityType;
    newRequest.platform = this.platform;
    newRequest.markerId = markerId;
    newRequest.requester = this;
    this.app.requests.add(newRequest);

    // let requester know request was created
    this.send({
      r: S2C.REQUEST_CREATED
    });
  }

  /*
  private signInGuest(message: any) {
    var login = message.l as string;
    var password = message.p as string;

    var db = this.app.dbManager.getPool();
    db.query(
      `SELECT ua_id, ua_hash FROM user WHERE ua_type = 'guest' AND ua_login = ${db.escape(login)}`,
      (err: any, result: any, fields: any) => {
        if (err) throw new Error(err);

        if (result.length == 0 && login == "" && password == "") {
          var newName = NameGenerator.getName();
          var newPassword = uuid().split("-")[4];

          bcrypt.hash(newPassword, 10, (err, hash) => {
            var newAccountRecord = new UserAccountRecord(this.engine);
            newAccountRecord._type = "guest";
            newAccountRecord._timestampCreated = Math.floor(Date.now() / 1000);
            newAccountRecord._timestampExpires = newAccountRecord._timestampCreated + Constants.GUEST_SECONDS_TO_EXPIRY;
            newAccountRecord._login = newName;
            newAccountRecord._displayName = newName;
            newAccountRecord.insert(
              hash,
              (insertId: number) => {
                // update guest credentials
                this.send({
                  r: "n.gc",
                  l: newName,
                  p: newPassword
                });
              }
            );
          });
        } else if (result.length > 0) {
          var id = result[0].ua_id;
          var hash = result[0].ua_hash;

          bcrypt.compare(password, hash, (err, matches) => {
            if (matches == true)
              this.loadAccount(id);
          });
        }
      }
    );
  }

  private signInGoogle(message: any) {}
  private signInFacebook(message: any) {}
  private signInTwitch(message: any) {}
  private signInApple(message: any) {}
  private signInSteam(message: any) {}

  private loadAccount(id: number) {
    var existingPlayer = this.engine.playerManager.getPlayerById(id);
    if (existingPlayer == null) {
      console.log(`Authorized userId: ${id}`);
      this.player = new Player(this.engine, this.ws);
      this.player.id = id;
      this.loadNext();
    } else {
      console.log(`Duplicate userId: ${id}`);
      this.ws.terminate();
    }
  }

  private loadNext() {
    this.loadState++;
    switch (this.loadState) {
      case 0:
        this.player.accountRecord = new UserAccountRecord(this.engine);
        this.player.accountRecord.load(this.player.id, this.loadNext.bind(this));
        break;
      case 1:
        this.removeEventListeners();
        this.engine.authManager.removeConnection(this.id);
        this.engine.playerManager.addPlayer(this.player);
        this.player.onLoaded();
        break;
    }
  }
  */

}