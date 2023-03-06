import { App } from "../../../App";
import { ContentType } from "../../../constants/Constants";
import { Content } from "./Content";

export class BaseContent {

  protected app: App;
  protected content: Content;
  public type: ContentType;

  public isAppended: boolean = false;
  public containerDiv: HTMLDivElement;

  constructor(app: App, content: Content, type: ContentType) {
    this.app = app;
    this.content = content;
    this.type = type;

    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "392px";
    this.containerDiv.style.height = "100%";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.flexDirection = "column";
  }

  public append() {
    if (this.isAppended) return;
    this.isAppended = true;

    this.content.containerDiv.appendChild(this.containerDiv);
  }

  public remove() {
    if (!this.isAppended) return;
    this.isAppended = false;

    this.content.containerDiv.removeChild(this.containerDiv);
  }

  public refresh() { }

}