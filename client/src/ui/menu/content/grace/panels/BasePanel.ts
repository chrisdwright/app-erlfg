import { App } from "../../../../../App";
import { GraceContent } from "../GraceContent";

export enum PanelType {
  EMPTY, MAIN, REQUEST, ASSIST
}

export class BasePanel {

  protected app: App;
  protected parent: GraceContent;

  public type: PanelType;
  public containerDiv: HTMLDivElement;

  constructor(app: App, parent: GraceContent, type: PanelType) {
    this.app = app;
    this.parent = parent;
    this.type = type;

    this.containerDiv = document.createElement("div");
    //this.containerDiv.style.width = "90%";
    this.containerDiv.style.height = "100%";
    //this.containerDiv.style.backgroundColor = "orange";
  }

  public toggle(type: PanelType) {
    if (this.type == type) {
      if (!this.parent.containerDiv.contains(this.containerDiv))
        this.parent.containerDiv.appendChild(this.containerDiv);
    } else {
      if (this.parent.containerDiv.contains(this.containerDiv))
        this.parent.containerDiv.removeChild(this.containerDiv);
    }
  }

}