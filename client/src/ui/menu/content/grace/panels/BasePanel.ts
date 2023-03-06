import { App } from "../../../../../App";
import { GraceContent } from "../GraceContent";

export enum PanelType {
  EMPTY, MAIN, REQUEST, ASSIST
}

export class BasePanel {

  protected app: App;
  protected content: GraceContent;

  public type: PanelType;
  public containerDiv: HTMLDivElement;

  constructor(app: App, content: GraceContent, type: PanelType) {
    this.app = app;
    this.content = content;
    this.type = type;

    this.containerDiv = document.createElement("div");
    this.containerDiv.style.height = "100%";
  }

  public toggle(type: PanelType) {
    if (this.type == type) {
      if (!this.content.containerDiv.contains(this.containerDiv))
        this.content.containerDiv.appendChild(this.containerDiv);
    } else {
      if (this.content.containerDiv.contains(this.containerDiv))
        this.content.containerDiv.removeChild(this.containerDiv);
    }
  }

}