import { App } from "../App";
import { C2S, S2C } from "../constants/Routes";
import { Utils } from "../Utils";
import { ChatHandler } from "./ChatHandler";
import { NetworkHandler } from "./NetworkHandler";
import { RequestHandler } from "./RequestHandler";

export class NetworkManager {

  private serverProtocol = "ws://";
  private serverIP = "192.168.0.19"; //"localhost";
  private serverPort = "5101";
  private serverAddress = this.serverProtocol + this.serverIP + ":" + this.serverPort;

  private app: App;
  public network: NetworkHandler;
  public request: RequestHandler;
  public chat: ChatHandler;

  private client: WebSocket;
  private transactions: C2S[] = [];

  constructor(app: App) {
    this.app = app;
    this.network = new NetworkHandler(app);
    this.request = new RequestHandler(app);
    this.chat = new ChatHandler(app);
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
        case S2C.NETWORK_SIGNED_IN: this.network.signedIn(message); break;
        case S2C.NETWORK_CHANGED_PLATFORM: this.network.changedPlatform(message); break;

        case S2C.REQUEST_CREATED: this.request.created(message); break;
        case S2C.REQUEST_DECLINED: this.request.declined(message); break;
        case S2C.REQUEST_LIST: this.request.list(message); break;
        case S2C.REQUEST_ADDED: this.request.added(message); break;
        case S2C.REQUEST_REMOVED: this.request.removed(message); break;
      }
    }
  }

  public send(data: any) {
    if (!this.client) return;
    this.client.send(JSON.stringify(data));
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

}