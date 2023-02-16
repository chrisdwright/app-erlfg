import { App } from "../../../../../../../App";
import { RequestType } from "../../../../../../../constants/CRequest";
import { Activities } from "./Activities";

export class Option {

  private app: App;
  private parent: Activities;
  private type: RequestType;

  private bossId: number;

  public containerDiv: HTMLDivElement;

  constructor(app: App, parent: Activities, type: RequestType) {
    this.app = app;
    this.parent = parent;
    this.type = type;

    this.init();
  }

  public destroy() {
    this.parent.optionsDiv.removeChild(this.containerDiv);
  }

  public setBoss(bossId: number) {
    this.bossId = bossId;

    const bossData = this.app.data.getBossById(bossId);
    switch (this.type) {
      case RequestType.BOSS: this.containerDiv.innerText = bossData.name; break;
      case RequestType.AREA_AND_BOSS: this.containerDiv.innerText = "Area + " + bossData.name; break;
    }
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "310px";
    this.containerDiv.style.height = "30px";
    this.containerDiv.style.background = "black";
    this.containerDiv.style.paddingLeft = "40px";
    this.containerDiv.style.color = "gold";
    this.containerDiv.style.cursor = "pointer";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.alignItems = "center";
    this.containerDiv.style.justifyContent = "start";
    this.containerDiv.style.textAlign = "center";
    this.containerDiv.style.fontSize = "16px";
    this.containerDiv.style.fontWeight = "bold";
    this.containerDiv.style.textShadow = "1px 1px #000000";
    this.containerDiv.style.background = "url('images/markers/idle.png') no-repeat";
    this.containerDiv.style.backgroundSize = "auto 100%";
    this.containerDiv.innerText = "Area";
    //this.containerDiv.style.background = "url('images/content/activities-icon.png') no-repeat";
    this.parent.optionsDiv.appendChild(this.containerDiv);

    this.containerDiv.onpointerenter = this.onMouseOver.bind(this);
    this.containerDiv.onpointerleave = this.onMouseOut.bind(this);
    this.containerDiv.onpointerdown = this.onMouseDown.bind(this);
  }

  private onMouseOver() {
    this.containerDiv.style.background = "url('images/markers/grace2.png') no-repeat";
    this.containerDiv.style.backgroundSize = "auto 100%";
  }

  private onMouseOut() {
    this.containerDiv.style.background = "url('images/markers/idle.png') no-repeat";
    this.containerDiv.style.backgroundSize = "auto 100%";
  }

  private onMouseDown() {
    //this.parent.selectOption(this.index);
  }

}