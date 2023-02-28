import { App } from "../../../../../../App";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";

export class EmptyPanel extends BasePanel {

  public emptyMessage: HTMLDivElement;

  constructor(app: App, parent: GraceContent) {
    super(app, parent, PanelType.EMPTY);

    this.init();
  }

  private init() {
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.justifyContent = "center";
    this.containerDiv.style.alignItems = "center";

    this.emptyMessage = document.createElement("div");
    this.emptyMessage.style.fontSize = "26px";
    this.emptyMessage.style.color = "white";
    this.emptyMessage.style.textAlign = "center";
    this.emptyMessage.style.textShadow = "1px 1px #000000";
    this.emptyMessage.innerHTML = "Select a <br>Site of Grace";
    this.containerDiv.appendChild(this.emptyMessage);
  }

}