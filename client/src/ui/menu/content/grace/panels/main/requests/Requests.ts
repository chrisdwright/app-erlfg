import { App } from "../../../../../../../App";
import { MainPanel } from "../MainPanel";

export class Requests {

  private app: App;
  private parent: MainPanel;

  public containerDiv: HTMLDivElement;
  public requests: Request[] = [];

  constructor(app: App, parent: MainPanel) {
    this.app = app;
    this.parent = parent;

    this.app.event.request_receivedList.register(this.request_receivedList.bind(this));
    this.app.event.request_addedRequest.register(this.request_addedRequest.bind(this));
    this.app.event.request_removedRequest.register(this.request_removedRequest.bind(this));

    this.init();
  }

  private init() {
    this.containerDiv = document.createElement("div");
    //this.containerDiv.style.backgroundColor = "gray";
    this.containerDiv.style.marginTop = "20px";
    this.parent.containerDiv.appendChild(this.containerDiv);
  }

  private request_receivedList() {

  }

  private request_addedRequest() {

  }

  private request_removedRequest() {

  }

}