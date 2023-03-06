import { App } from "../../../../../../App";
import { TitleBox } from "../../../../components/TitleBox";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";
import { Activities } from "./activities/Activities";

export class MainPanel extends BasePanel {

  public title: TitleBox;
  public activities: Activities;

  constructor(app: App, content: GraceContent) {
    super(app, content, PanelType.MAIN);

    this.init();
  }

  public toggle(type: PanelType) {
    super.toggle(type);
    if (this.type != type) return;

    // refresh info
    const markerId = this.content.markerId;
    const markerData = this.app.data.markers.getById(markerId);

    this.title.setText(markerData.name);
    this.activities.refresh();
  }

  private init() {
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
    this.containerDiv.style.alignItems = "center";

    this.title = new TitleBox(this.app, this.containerDiv);
    this.activities = new Activities(this.app, this.content, this);
  }

}