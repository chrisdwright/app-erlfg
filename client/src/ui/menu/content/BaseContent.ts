import { App } from "../../../App";
import { ContentType } from "../../../constants/ContentType";
import { Content } from "./Content";

export class BaseContent {

  protected app: App;
  protected parent: Content;
  public type: ContentType;

  public isAppended: boolean = false;
  public containerDiv: HTMLDivElement;

  constructor(app: App, parent: Content, type: ContentType) {
    this.app = app;
    this.parent = parent;
    this.type = type;

    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "392px";
    this.containerDiv.style.height = "100%";
    //this.containerDiv.style.overflow = "hidden";
  }

  public append() {
    if (this.isAppended) return;
    this.isAppended = true;

    this.parent.containerDiv.appendChild(this.containerDiv);
  }

  public remove() {
    if (!this.isAppended) return;
    this.isAppended = false;

    this.parent.containerDiv.removeChild(this.containerDiv);
  }

  public refresh() { }

}