import { App } from "../App";
import { AccountType } from "../constants/AccountType";
import { RequestType } from "../constants/CRequest";
import { PlatformType } from "../constants/PlatformType";
import { C2S, S2C } from "../constants/Routes";
import { Utils } from "../Utils";

export class NetworkManager {

  private serverProtocol = "ws://";
  private serverIP = "192.168.0.19"; //"localhost";
  private serverPort = "5101";
  private serverAddress = this.serverProtocol + this.serverIP + ":" + this.serverPort;

  private app: App;
  private client: WebSocket;
  private transactions: C2S[] = [];

  constructor(app: App) {
    this.app = app;
  }

  public connectToServer() {
    this.client = new WebSocket(this.serverAddress);
    this.client.onopen = (event: any) => {
      console.log("connected to server");
      this.app.event.network_connected.emit();
    }
    this.client.onclose = (event: any) => {
      console.log("disconnected from server");
    }
    this.client.onmessage = (event: any) => {
      var message = JSON.parse(event.data);
      Utils.logMessage(message);

      switch (message.r) {
        case S2C.NETWORK_SIGNED_IN: this.network_signedIn(message); break;
        case S2C.NETWORK_CHANGED_PLATFORM: this.network_changedPlatform(message); break;
        case S2C.REQUEST_CREATED: this.request_created(message); break;
        case S2C.REQUEST_DECLINED: this.request_declined(message); break;
        case S2C.REQUEST_LIST: this.request_list(message); break;
        case S2C.REQUEST_ADDED: this.request_added(message); break;
        case S2C.REQUEST_REMOVED: this.request_removed(message); break;
      }
    }
  }

  //#region === Transactions ===

  public addTransaction(route: C2S) {
    this.transactions.push(route);
  }

  public removeTransaction(route: C2S) {
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i] == route) {
        this.transactions.splice(i, 1);
        break;
      }
    }
  }

  public isBusy() {
    if (!this.client) return true;
    return this.transactions.length > 0;
  }

  //#endregion

  //#region === Outgoing ===

  public signIn(accountType: AccountType, platform: PlatformType) {
    if (this.isBusy()) return;
    this.addTransaction(C2S.NETWORK_SIGN_IN);

    // TODO: don't i have to add credentials here?
    this.send({
      r: C2S.NETWORK_SIGN_IN,
      t: accountType,
      p: platform
    });
  }

  public selectPlatform(platform: PlatformType) {
    if (this.isBusy()) return;
    this.addTransaction(C2S.NETWORK_SELECT_PLATFORM);

    this.send({
      r: C2S.NETWORK_SELECT_PLATFORM,
      p: platform
    });
  }

  public createRequest(markerId: number, type: RequestType, bossId: number) {
    if (this.isBusy()) return;
    this.addTransaction(C2S.REQUEST_CREATE_NEW);

    this.send({
      r: C2S.REQUEST_CREATE_NEW,
      i: markerId,
      t: type,
      b: bossId
    });
  }

  //#endregion

  //#region === Incoming ===

  private network_signedIn(message: any) {
    var platformType = message.p;
    this.app.data.setPlatform(platformType);

    this.removeTransaction(C2S.NETWORK_SIGN_IN);
  }

  private network_changedPlatform(message: any) {
    var platformType = message.p;
    this.app.data.setPlatform(platformType);

    this.removeTransaction(C2S.NETWORK_SELECT_PLATFORM);
  }

  private request_created(message: any) {

  }

  private request_declined(message: any) {

  }

  private request_list(message: any) {
    console.log(message);

    this.app.event.request_receivedList.emit();
  }

  private request_added(message: any) {
    this.app.event.request_addedRequest.emit();
  }

  private request_removed(message: any) {
    const requestId = message.i;

    this.app.event.request_removedRequest.emit();
  }

  //#endregion

  private send(data: any) {
    if (!this.client) return;
    this.client.send(JSON.stringify(data));
  }

}