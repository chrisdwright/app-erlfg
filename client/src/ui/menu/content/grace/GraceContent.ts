import { App } from "../../../../App";
import { ContentType, ModeType } from "../../../../constants/Constants";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";
import { BasePanel, PanelType } from "./panels/BasePanel";
import { EmptyPanel } from "./panels/empty/EmptyPanel";
import { MainPanel } from "./panels/main/MainPanel";
import { RequestPanel } from "./panels/request/RequestPanel";

export class GraceContent extends BaseContent {

  public panels: BasePanel[] = [];
  public markerId: number = -1;

  constructor(app: App, content: Content) {
    super(app, content, ContentType.GRACE);

    this.app.event.map_clickedMarker.register(this.map_clickedMarker.bind(this));
    //this.app.event.data_updatedMarkerId.register(this.data_onUpdatedMarkerId.bind(this));

    this.init();
  }

  public refresh() {
  }

  private init() {
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.justifyContent = "center";
    this.containerDiv.style.alignItems = "center";

    this.panels.push(new EmptyPanel(this.app, this));
    this.panels.push(new MainPanel(this.app, this));
    this.panels.push(new RequestPanel(this.app, this));

    this.setPanel(PanelType.EMPTY);
  }

  private setPanel(type: PanelType) {
    for (var i = 0; i < this.panels.length; i++)
      this.panels[i].toggle(type);
  }

  //#region === Event Listeners ===

  private map_clickedMarker(markerId: number) {
    if (this.app.data.mode != ModeType.IDLE) return;
    this.markerId = markerId;
    this.setPanel(PanelType.MAIN);
  }

  //#endregion

}