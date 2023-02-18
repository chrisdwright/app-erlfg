import { App } from "../../../../../../../App";
import { RequestType } from "../../../../../../../constants/Constants";
import { MainPanel } from "../MainPanel";
import { Option } from "./Option";

export class Activities {

  private app: App;
  private parent: MainPanel;

  public containerDiv: HTMLDivElement;
  public optionsDiv: HTMLDivElement;
  public options: Option[] = [];

  constructor(app: App, parent: MainPanel) {
    this.app = app;
    this.parent = parent;

    this.init();
  }

  public refresh() {
    var markerId = this.app.data.markerId;
    var markerData = this.app.data.getMarkerById(markerId);

    // remove old options
    for (let i = 0; i < this.options.length; i++)
      this.options[i].destroy();
    this.options = [];

    // create boss options
    for (let i = 0; i < markerData.bosses.length; i++) {
      const option = new Option(this.app, this, RequestType.BOSS);
      option.setBoss(markerData.bosses[i]);
      this.options.push(option);
    }

    // create boss and area options
    for (let i = 0; i < markerData.bosses.length; i++) {
      const option = new Option(this.app, this, RequestType.AREA_AND_BOSS);
      option.setBoss(markerData.bosses[i]);
      this.options.push(option);
    }

    // create area option
    const option = new Option(this.app, this, RequestType.AREA);
    this.options.push(option);
  }

  public selectOption(type: RequestType, bossId: number = 0) {
    const markerId = this.app.data.markerId;
    this.app.net.createRequest(markerId, type, bossId);
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "392px";
    this.containerDiv.style.marginTop = "10px";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
    this.parent.containerDiv.appendChild(this.containerDiv);

    const top = document.createElement("img");
    top.src = "images/menu/frame-single-top.png";
    this.containerDiv.appendChild(top);

    this.optionsDiv = document.createElement("div");
    this.optionsDiv.style.paddingLeft = "40px";
    this.optionsDiv.style.display = "flex";
    this.optionsDiv.style.flexDirection = "column";
    this.optionsDiv.style.backgroundImage = "url('images/menu/frame-single-middle.png')";
    this.containerDiv.appendChild(this.optionsDiv);

    const bottom = document.createElement("img");
    bottom.src = "images/menu/frame-single-bottom.png";
    this.containerDiv.appendChild(bottom);
  }

}