import { App } from "../../../../App";
import { ContentType } from "../../../../constants/ContentType";
import { ModeType } from "../../../../constants/ModeType";
import { Marker } from "../../../../map/Marker";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";
import { AssistPanel } from "./panels/assist/AssistPanel";
import { BasePanel, PanelType } from "./panels/BasePanel";
import { EmptyPanel } from "./panels/empty/EmptyPanel";
import { MainPanel } from "./panels/main/MainPanel";
import { RequestPanel } from "./panels/request/RequestPanel";

export class GraceContent extends BaseContent {

  public panels: BasePanel[] = [];

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.GRACE);

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
    this.panels.push(new AssistPanel(this.app, this));

    this.setPanel(PanelType.EMPTY);
  }

  private setPanel(type: PanelType) {
    for (var i = 0; i < this.panels.length; i++)
      this.panels[i].toggle(type);
  }

  private map_clickedMarker(marker: Marker) {
    if (this.app.data.mode != ModeType.IDLE) return;
    this.app.data.markerId = marker.data.id;
    this.setPanel(PanelType.MAIN);
  }

}