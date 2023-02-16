import { App } from "../../../App";
import { ContentType } from "../../../constants/ContentType";
import { Tabs } from "./Tabs";

export class Tab {

  private app: App;
  private parent: Tabs;
  private type: ContentType;

  public containerDiv: HTMLDivElement;
  public iconImage: HTMLImageElement;

  constructor(app: App, parent: Tabs, type: ContentType) {
    this.app = app;
    this.parent = parent;
    this.type = type;

    this.init();
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = Tabs.TAB_WIDTH + "px";
    this.containerDiv.style.height = Tabs.TAB_HEIGHT + "px";
    this.containerDiv.style.backgroundColor = "black";
    this.containerDiv.style.pointerEvents = "auto";
    this.containerDiv.style.backgroundImage = "url('images/tabs/" + this.type + ".png')";
    this.parent.tabsDiv.appendChild(this.containerDiv);

    switch (this.type) {
      case ContentType.HOME:
        this.containerDiv.style.marginTop = "20px";
        break;
      case ContentType.GRACE:
      case ContentType.CHAT:
      case ContentType.FEEDBACK:
      case ContentType.ACCOUNT:
        this.containerDiv.style.marginTop = "5px";
        break;
    }

    this.containerDiv.addEventListener("pointerdown", (ev) => {
      this.app.event.menu_clickedTab.emit(this.type);
    });
  }

}