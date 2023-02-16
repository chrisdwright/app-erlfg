import { App } from "../../../../../../App";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";
import { Activities } from "./activities/Activities";
import { Requests } from "./requests/Requests";

export class MainPanel extends BasePanel {

  public titleDiv: HTMLDivElement;

  public activities: Activities;
  public requests: Requests;

  constructor(app: App, parent: GraceContent) {
    super(app, parent, PanelType.MAIN);

    this.init();
  }

  public toggle(type: PanelType) {
    super.toggle(type);
    if (this.type != type) return;

    // refresh info
    var markerId = this.app.data.markerId;
    var markerData = this.app.data.getMarkerById(markerId);

    this.titleDiv.innerHTML = markerData.name;
    this.activities.refresh();
  }

  private init() {
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
    this.containerDiv.style.alignItems = "center";

    const topBar = document.createElement("img");
    topBar.src = "images/content/bar-horizontal.png";
    this.containerDiv.appendChild(topBar);

    this.titleDiv = document.createElement("div");
    this.titleDiv.style.width = "90%";
    this.titleDiv.style.color = "white";
    this.titleDiv.style.textAlign = "center";
    this.titleDiv.style.fontSize = "30px";
    this.titleDiv.style.paddingTop = "5px";
    this.titleDiv.style.paddingBottom = "5px";
    this.titleDiv.innerHTML = "Site of Grace";
    this.titleDiv.style.textShadow = "2px 2px #000000";
    this.containerDiv.appendChild(this.titleDiv);

    const bottomBar = document.createElement("img");
    bottomBar.src = "images/content/bar-horizontal.png";
    this.containerDiv.appendChild(bottomBar);

    this.activities = new Activities(this.app, this);
    this.requests = new Requests(this.app, this);
  }

}