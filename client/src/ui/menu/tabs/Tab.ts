import { App } from "../../../App";
import { ContentType } from "../../../constants/Constants";
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
    this.containerDiv.style.marginTop = "5px";
    this.containerDiv.style.backgroundColor = "black";
    this.containerDiv.style.pointerEvents = "auto";
    this.containerDiv.style.cursor = "pointer";
    this.parent.tabsDiv.appendChild(this.containerDiv);

    switch (this.type) {
      case ContentType.HOME:
        this.containerDiv.style.marginTop = "20px";
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/home.png')";
        break;
      case ContentType.GRACE:
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/grace.png')";
        break;
      case ContentType.CHAT:
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/chat.png')";
        break;
      case ContentType.FEEDBACK:
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/feedback.png')";
        break;
      case ContentType.ACCOUNT:
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/account.png')";
        break;
      case ContentType.ABOUT:
        this.containerDiv.style.backgroundImage = "url('images/menu/tabs/about.png')";
        break;
    }

    this.containerDiv.addEventListener("pointerdown", (ev) => {
      this.app.event.menu_clickedTab.emit(this.type);
    });
  }

}