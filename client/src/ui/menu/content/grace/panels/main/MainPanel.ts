import { App } from "../../../../../../App";
import { TitleBox } from "../../../../components/TitleBox";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";
import { Activities } from "./activities/Activities";
import { Requests } from "./requests/Requests";

export class MainPanel extends BasePanel {

  public title: TitleBox;
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

    this.title.setText(markerData.name);
    this.activities.refresh();
  }

  private init() {
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
    this.containerDiv.style.alignItems = "center";

    this.title = new TitleBox(this.app, this.containerDiv);
    this.activities = new Activities(this.app, this);
    this.requests = new Requests(this.app, this);
  }

}