import { App } from "../../../App";
import { ContentType } from "../../../constants/ContentType";
import { Menu } from "../Menu";
import { Tab } from "./Tab";

export class Tabs {

  public static TAB_WIDTH = 60;
  public static TAB_HEIGHT = 60;

  private app: App;
  private parent: Menu;

  public containerDiv: HTMLDivElement;
  public tabsDiv: HTMLDivElement;
  public borderDiv: HTMLDivElement;

  public homeTab: Tab;
  public graceTab: Tab;
  public chatTab: Tab;
  public feedbackTab: Tab;
  public accountTab: Tab;

  constructor(app: App, parent: Menu) {
    this.app = app;
    this.parent = parent;

    this.init();
  }

  public setSelected(type: ContentType) {
    this.borderDiv.style.backgroundImage = "url('images/menu/tabs/border-" + type + ".jpg')";
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = (Tabs.TAB_WIDTH + 8) + "px";
    this.containerDiv.style.height = "100%";
    this.containerDiv.style.display = "flex";
    this.parent.containerDiv.appendChild(this.containerDiv);

    this.tabsDiv = document.createElement("div");
    this.tabsDiv.style.display = "flex";
    this.tabsDiv.style.flexDirection = "column";
    this.containerDiv.appendChild(this.tabsDiv);

    this.borderDiv = document.createElement("div");
    this.borderDiv.style.width = "8px";
    this.borderDiv.style.height = "100%";
    this.borderDiv.style.pointerEvents = "auto";
    this.borderDiv.style.backgroundImage = "url('images/menu/tabs/border-0.jpg')";
    this.containerDiv.appendChild(this.borderDiv);

    // tabs
    this.homeTab = new Tab(this.app, this, ContentType.HOME);
    this.graceTab = new Tab(this.app, this, ContentType.GRACE);
    this.chatTab = new Tab(this.app, this, ContentType.CHAT);
    this.feedbackTab = new Tab(this.app, this, ContentType.FEEDBACK);
    this.accountTab = new Tab(this.app, this, ContentType.ACCOUNT);
  }

}