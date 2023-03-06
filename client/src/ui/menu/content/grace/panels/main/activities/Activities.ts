import { App } from "../../../../../../../App";
import { RequestType } from "../../../../../../../constants/Constants";
import { GraceContent } from "../../../GraceContent";
import { MainPanel } from "../MainPanel";
import { Option } from "./Option";

export class Activities {

  private app: App;
  private content: GraceContent;
  private panel: MainPanel;

  public containerDiv: HTMLDivElement;
  public optionsDiv: HTMLDivElement;
  public options: Option[] = [];

  constructor(app: App, content: GraceContent, panel: MainPanel) {
    this.app = app;
    this.panel = panel;

    this.init();
  }

  public refresh() {
    var markerId = this.content.markerId;
    var markerData = this.app.data.markers.getById(markerId);

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
    const markerId = this.content.markerId;
    this.app.net.request.create(markerId, type, bossId);
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "344px";
    this.containerDiv.style.marginTop = "10px";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
    this.panel.containerDiv.appendChild(this.containerDiv);

    const top = document.createElement("img");
    top.src = "images/menu/frames/single-top.png";
    this.containerDiv.appendChild(top);

    this.optionsDiv = document.createElement("div");
    this.optionsDiv.style.padding = "5px";
    this.optionsDiv.style.paddingLeft = "15px";
    this.optionsDiv.style.display = "flex";
    this.optionsDiv.style.flexDirection = "column";
    this.optionsDiv.style.backgroundImage = "url('images/menu/frames/single-middle.png')";
    this.containerDiv.appendChild(this.optionsDiv);

    const bottom = document.createElement("img");
    bottom.src = "images/menu/frames/single-bottom.png";
    this.containerDiv.appendChild(bottom);
  }

}